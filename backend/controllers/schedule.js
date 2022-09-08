const db = require('../db');
const queries = require('../queries');

const getCities = async (req, res) => {
    try {
        const citiesQuery = await db.query(queries.getCities);
        const cities = citiesQuery.rows;
        const response = cities.map(city => city.city);

        res.status(200).send(response);
    } catch (err) {
        console.log(err);
        res.status(404).send('There was a problem loading the cities we service.')
    }
    
}

const getAvailability = async (req, res) => {
    try {
        const today = new Date();
        const customerId = req.user.customer_id;

        //start by getting the area ID of the customer
        const areaIdQuery = await db.query(queries.getAreaIdByCustomer, [customerId]);
        const areaId = areaIdQuery.rows[0].area_id;

        //get today's date and format it properly for the query
        const date = today.toISOString().split('T')[0];

        //query the availability in the route. We're looking for stuff coming up that has more than one appointment available. Send an empty array if nothing is found with a 200 status.
        const availabilityQuery = await db.query(queries.getAvailability, [areaId, date]);
        const availability = availabilityQuery.rows;

        res.status(200).send(availability);
    } catch (err) {
        console.log(err)
        res.status(404).send('There was an error finding availability')
    }
}

const setAppointmentDate = async (req, res) => {
    const { routeId } = req.params;
    const customerId = req.user.customer_id;

    try {
        //update every cart item based on the customer Id by linking the record to a route listed in the route table
        await db.query(queries.setAppointmentDate, [routeId, customerId]);
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(404).send('There was an issue scheduling the services in the cart');
    }
}

module.exports = {
    getCities,
    getAvailability,
    setAppointmentDate
}