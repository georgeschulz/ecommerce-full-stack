const db = require('../db');
const queries = require('../queries');

const getCities = async (req, res) => {
    const citiesQuery = await db.query(queries.getCities);
    const cities = citiesQuery.rows;
    const response = cities.map(city => city.city);

    res.status(200).send(response);
}

module.exports = {
    getCities
}