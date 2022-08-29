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
        const cost = Math.round(
            (Math.pow(multiplier, tier - 1) * 
            (base + (pricePerSquareFeet * Number(squareFeet)))) * 100
        )/100;
        
        //calculate billing amount
        let billingAmount;
        switch(serviceToUpdate.billing_type) {
            case 'month':
                billingAmount = cost * (serviceToUpdate.frequency / 12);
                break;
            case 'year':
                billingAmount = cost;
                break;
            case 'service':
                billingAmount = cost;
                break;
            default:
                billingAmount = cost;
                break;
        }

        serviceToUpdate["price"] = cost;
        serviceToUpdate["billing_amount"] = billingAmount;
    }

    res.status(200).send({services})
}

const getDetailedServiceById = async (req, res) => {
    const user = req.params.id;
    const serviceId = req.params.serviceId;
    const target = req.query.target;

    let serviceQuery = await db.query(queries.getServiceById, [serviceId]);
    let service = serviceQuery.rows;

    //get squareFeet for the user
    let squareFeetQuery = await db.query(queries.getSquareFeet, [user]);
    let squareFeet = squareFeetQuery.rows[0].square_feet;

    //get pest tier
    let pestTierQuery = await db.query(queries.getPestTier, [target])
    let tier = pestTierQuery.rows[0].tier;

    //add benefits and testimonials to the service object so they can be rendered by the landing page
    let benefitsQuery = await db.query(queries.getBenefitsByServiceId, [serviceId]);
    service[0]["benefits"] = benefitsQuery.rows;

    let testimonialQuery = await db.query(queries.getTestimonialByServiceId, [serviceId]);
    service[0]["testimonials"] = testimonialQuery.rows;

    //get a list of covered pests from the services_pests table
    let pestsQuery = await db.query(queries.getCoveredPestsByServiceId, [serviceId]);
    const coveredPests = pestsQuery.rows.map(pest => pest["pests"]);

    //get supporting images for slideshow
    const imageQuery = await db.query(queries.getServiceImages, [serviceId]);
    const supportingImages = imageQuery.rows.filter(image => image.type === 'Supporting');
    const bannerImg = imageQuery.rows.filter(image => image.type === 'Banner')[0];

    //add pricing
    const pricePerSquareFeet = Number(service[0].price_per_square_foot);
    const base = Number(service[0].base_price);
    const multiplier = Number(service[0].tier_multiplier);
    const frequency = Number(service[0].frequency)

    const cost = Math.round(
        (Math.pow(multiplier, tier - 1) * 
        (base + (pricePerSquareFeet * Number(squareFeet)))) * 100
    )/100;
    
    service[0]["price"] = cost;
    service[0]["billing_amount"] = service[0].billing_type === 'month' 
        ? cost * (frequency /12) 
        : cost;
    
    //pull out the data to restructure for response
    const {
        service_id, 
        service_name,
        price_per_square_foot,
        billing_type,
        tier_multiplier,
        services_per_year,
        base_price,
        setup_fee,
        img_path,
        benefits,
        testimonials,
        price,
        billing_amount
    } = service[0];
    
    res.status(200).send({
        service_id, 
        service_name,
        price_per_square_foot,
        billing_type,
        tier_multiplier,
        services_per_year,
        base_price,
        setup_fee,
        price,
        billing_amount,
        frequency,
        tier,
        squareFeet,
        img_path,
        benefits,
        testimonials,
        coveredPests,
        supportingImages,
        bannerImg
    } );
}



module.exports = {
    getAllServices,
    getServiceById,
    getServiceDetailedByTarget,
    getDetailedServiceById
}