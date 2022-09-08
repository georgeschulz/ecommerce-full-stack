const queries = require('../queries');
const db = require('../db');
const calculatePrice = require('../helpers/calculatePrice');

//get all services as an array of objects, each object representing a service
const getAllServices = (req, res) => {
    db.query(queries.selectAllServices, (err, results) => {
        if (err) throw err;
        res.status(200).send(results.rows);
    })
}

//get a specific service by the service ID
const getServiceById = (req, res) => {
    const user = req.user.customer_id;
    db.query(queries.getServiceById, [id], (err, results) => {
        if (err) throw err;
        res.status(200).send(results.rows);
    });
}

const getAllServicesDetails = async (req, res) => {
    try {
        let serviceQuery = await db.query(queries.selectAllServices);
        let services = serviceQuery.rows;

        for (const service in services) {
            let serviceToUpdate = services[service];
            let serviceId = serviceToUpdate.service_id;
            //get the benefits
            let benefitsQuery = await db.query(queries.getBenefitsByServiceId, [serviceId])
            serviceToUpdate['benefits'] = benefitsQuery.rows;
            //get the testimonials
            let testimonialQuery = await db.query(queries.getTestimonialByServiceId, [serviceId]);
            serviceToUpdate['testimonials'] = testimonialQuery.rows;

            //get a list of covered pests from the services_pests table
            let pestsQuery = await db.query(queries.getCoveredPestsByServiceId, [serviceId]);
            const coveredPests = pestsQuery.rows.map(pest => pest["pests"]);
            serviceToUpdate['covered_pests'] = coveredPests;
        }


        res.status(200).send(services);
    } catch (e) {
        console.log(e);
        res.status(404).send('There was an issue retrieving the services')
    }
}

const getAllServicesDetailsById = async (req, res) => {
    try {
        const user = req.user.customer_id;
        const serviceId = req.params.serviceId;

        let serviceQuery = await db.query(queries.getServiceById, [serviceId]);
        let services = serviceQuery.rows;

        for (const service in services) {
            let serviceToUpdate = services[service];
            let serviceId = serviceToUpdate.service_id;
            //get the benefits
            let benefitsQuery = await db.query(queries.getBenefitsByServiceId, [serviceId])
            serviceToUpdate['benefits'] = benefitsQuery.rows;
            //get the testimonials
            let testimonialQuery = await db.query(queries.getTestimonialByServiceId, [serviceId]);
            serviceToUpdate['testimonials'] = testimonialQuery.rows;
        }

        //get a list of covered pests from the services_pests table
        let pestsQuery = await db.query(queries.getCoveredPestsByServiceId, [serviceId]);
        const coveredPests = pestsQuery.rows.map(pest => pest["pests"]);

        //get supporting images for slideshow
        const imageQuery = await db.query(queries.getServiceImages, [serviceId]);
        const supportingImages = imageQuery.rows.filter(image => image.type === 'Supporting');
        const bannerImg = imageQuery.rows.filter(image => image.type === 'Banner')[0];

        res.status(200).send({
            ...services[0],
            bannerImg,
            supportingImages,
            coveredPests
        });
    } catch (e) {
        console.log(e);
        res.status(404).send('There was an issue retrieving the services')
    }
}

//route to get the information for the servicesTile component (calculate the price of the service and provide the details of the service like benefits and testimonials)
const getServiceDetailedByTarget = async (req, res) => {
    try {
        const user = req.user.customer_id;
        let squareFeet = req.user.square_feet;
        const target = req.query.target;

        //get the services data
        let serviceQuery = await db.query(queries.getServiceByTarget, [target]);
        let services = serviceQuery.rows;

        //get pest tier
        let pestTierQuery = await db.query(queries.getPestTier, [target])
        let tier = pestTierQuery.rows[0].tier;

        //loop through each of the services and benefits and testimonials to them
        for (const service in services) {
            let serviceToUpdate = services[service];
            let serviceId = serviceToUpdate.service_id;
            //get the benefits
            let benefitsQuery = await db.query(queries.getBenefitsByServiceId, [serviceId])
            serviceToUpdate['benefits'] = benefitsQuery.rows;
            //get the testimonials
            let testimonialQuery = await db.query(queries.getTestimonialByServiceId, [serviceId]);
            serviceToUpdate['testimonials'] = testimonialQuery.rows;
        }

        const servicesWithPricing = [];

        //calculate pricing based on the completed detailed data object
        for (let service in services) {
            const serviceWithPrice = await calculatePrice(services[service], user, target);
            servicesWithPricing.push(serviceWithPrice)
        }

        res.status(200).send({ services: servicesWithPricing })
    } catch (err) {
        console.log(err);
        res.status(404).send('There was an error retrieving the service');
    }
}

const getDetailedServiceById = async (req, res) => {
    try {
        const user = req.user.customer_id;
        let squareFeet = req.user.square_feet;
        const serviceId = req.params.serviceId;
        const target = req.query.target;

        let serviceQuery = await db.query(queries.getServiceById, [serviceId]);
        let service = serviceQuery.rows;

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
        const serviceWithPricing = calculatePrice(service[0], user, target);

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
            billing_amount,
            frequency
        } = await serviceWithPricing;

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
        });
    } catch (err) {
        console.log(err);
        res.status(404).send('There was an error retriving the service');
    }
}

const getFeaturedServices = async (req, res) => {
    try {
        const featuredServiceQuery = await db.query(queries.getFeaturedServices);
        const featuredServices = featuredServiceQuery.rows;

        res.status(200).send(featuredServices)
    } catch (e) {
        console.log(e);
        res.status(404).send({ msg: 'No featured services were found' });
    }
}


module.exports = {
    getAllServices,
    getServiceById,
    getServiceDetailedByTarget,
    getDetailedServiceById,
    getAllServicesDetails,
    getAllServicesDetailsById,
    getFeaturedServices
}