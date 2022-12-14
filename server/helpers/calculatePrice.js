const queries = require('../queries');
const db = require('../db');

//this reusable function takes a service, user id and target to calculate the price of service. These are all needed because price is based on 1) service parameters 2) the size of a customers house 3) the difficulty to remove the pest
const calculatePrice = async (service, userId, target) => {
    //get the square feet
    let squareFeetQuery = await db.query(queries.getSquareFeet, [userId]);
    let squareFeet = squareFeetQuery.rows[0].square_feet;

    //get pest tier
    let pestTierQuery = await db.query(queries.getPestTier, [target])
    let tier = pestTierQuery.rows[0].tier;

    //add pricing
    const pricePerSquareFeet = Number(service.price_per_square_foot);
    const base = Number(service.base_price);
    const multiplier = Number(service.tier_multiplier);
    const frequency = Number(service.frequency)

    //pricing formula, built at actual job
    const cost = Math.round(
        (Math.pow(multiplier, tier - 1) * 
        (base + (pricePerSquareFeet * Number(squareFeet))))
    );

    service["price"] = cost;
    service["billing_amount"] = service.billing_type === 'month' 
        ? Math.round(cost * (frequency /12) * 100) /100 
        : cost;
    
    return service;
}

module.exports = calculatePrice;