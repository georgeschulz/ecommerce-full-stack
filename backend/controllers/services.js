const queries = require('../queries');
const db = require('../db');

//get all services as an array of objects, each object representing a service
const getAllServices = (req, res) => {
    db.query(queries.selectAllServices, (err, results) => {
        if (err) throw err;
        res.status(200).send(results.rows);
    })
}

//get a specific service by the service ID
const getServiceById = (req, res) => {
    const id = req.params.id;
    db.query(queries.getServiceById, [id], (err, results) => {
        if (err) throw err;
        res.status(200).send(results.rows);
    });
}

//route to get the information for the servicesTile component (calculate the price of the service and provide the details of the service like benefits and testimonials)
const getServiceDetailedByTarget = async (req, res) => {
    const user = req.params.id;
    const target = req.query.target;
    
    //get the services data
    let serviceQuery = await db.query(queries.getServiceByTarget, [target]);
    let services = serviceQuery.rows;
    
    //get squareFeet for the user
    let squareFeetQuery = await db.query(queries.getSquareFeet, [user]);
    let squareFeet = squareFeetQuery.rows[0].square_feet;

    //get pest tier
    let pestTierQuery = await db.query(queries.getPestTier, [target])
    let tier = pestTierQuery.rows[0].tier;

    //loop through each of the services and benefits and testimonials to them
    for(const service in services) {
        let serviceToUpdate = services[service];
        let serviceId = serviceToUpdate.service_id;
        //get the benefits
        let benefitsQuery = await db.query(queries.getBenefitsByServiceId, [serviceId])
        serviceToUpdate['benefits'] = benefitsQuery.rows;
        //get the testimonials
        let testimonialQuery = await db.query(queries.getTestimonialByServiceId, [serviceId]);
        serviceToUpdate['testimonials'] = testimonialQuery.rows;
    }

    //calculate pricing based on the completed detailed data object
    for(const service in services) { 
        let serviceToUpdate = services[service];
        //pull the data we need from the service object
        const pricePerSquareFeet = Number(serviceToUpdate.price_per_square_foot);
        const base = Number(serviceToUpdate.base_price);
        const multiplier = Number(serviceToUpdate.tier_multiplier);
    
        //do the math
        serviceToUpdate["price"] = Math.round(
            (Math.pow(multiplier, tier - 1) * 
            (base + (pricePerSquareFeet * Number(squareFeet)))) * 100
        )/100;
    }

    res.status(200).send({services})
}

module.exports = {
    getAllServices,
    getServiceById,
    getServiceDetailedByTarget
}