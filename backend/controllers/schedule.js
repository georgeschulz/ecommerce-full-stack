const { query } = require('express');
const db = require('../db');
const queries = require('../queries');

const getCities = async (req, res) => {
    const citiesQuery = await db.query(queries.getCities);
    const cities = citiesQuery.rows;
    const response = cities.map(city => city.city);

    res.status(200).send(response);
}

const getAvailability = async (req, res) => {
    const today = new Date();
    const { customerId } = req.params;

    //start by getting the area ID of the customer
    const areaIdQuery = await db.query(queries.getAreaIdByCustomer, [customerId]);
    const areaId = areaIdQuery.rows[0].area_id;


    const date = today.toISOString().split('T')[0];

    const availabilityQuery = await db.query(queries.getAvailability, [areaId, date]);
    const availability = availabilityQuery.rows;

    res.status(200).send(availability);
}

module.exports = {
    getCities,
    getAvailability
}