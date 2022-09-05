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
    const customerId = req.user.customer_id;

    //start by getting the area ID of the customer
    const areaIdQuery = await db.query(queries.getAreaIdByCustomer, [customerId]);
    const areaId = areaIdQuery.rows[0].area_id;


    const date = today.toISOString().split('T')[0];

    const availabilityQuery = await db.query(queries.getAvailability, [areaId, date]);
    const availability = availabilityQuery.rows;

    res.status(200).send(availability);
}

const setAppointmentDate = async (req, res) => {
    const { routeId } = req.params;
    const customerId = req.user.customer_id;

    //update every cart item based on the customer Id by linking the record to a route listed in the route table
    const appointmentQuery = await db.query(queries.setAppointmentDate, [routeId, customerId]);

    res.status(200).send();
}

module.exports = {
    getCities,
    getAvailability,
    setAppointmentDate
}