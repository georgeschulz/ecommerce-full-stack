const db = require('../db');
const logger = require('../logger');
const queries = require('../queries');

const getAllTechs = async () => {
    console.log('get techs')
    try {
        const query = await db.query(queries.getAllTechs);
        return query.rows;
    } catch (err) {
        console.log(err);
    }
}

const createNewDayFromTechList = async (techs, date) => {
    console.log('get tech list')
    try {
        techs.forEach(async (tech) => {
            await db.query(queries.createNewRoute, [tech.tech_id, date])
        })
    } catch (err) {
        console.log(err)
    }   
}

const createDayRoute = async (req, res, next) => {
    try {
        const techs = await getAllTechs();
        const date = req.body.date;
        await createNewDayFromTechList(techs, date);
    } catch (err) {
        logger.error(err);
        res.status(400).send('Could not create a route')
    }
}

const getAllAvailability = (req, res, next) => {
    console.log('get')
}

module.exports = {
    getAllAvailability,
    createDayRoute
}