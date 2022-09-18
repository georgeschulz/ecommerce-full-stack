const db = require('../db');
const logger = require('../logger');
const queries = require('../queries');

//model layer functions 
const getAllTechs = async () => {
    try {
        const query = await db.query(queries.getAllTechs);
        return query.rows;
    } catch (err) {
        console.log(err);
    }
}

const createNewDayFromTechList = async (techs, date) => {
    try {
        techs.forEach(async (tech) => {
            await db.query(queries.createNewRoute, [tech.tech_id, date])
        })
    } catch (err) {
        console.log(err)
    }   
}

const getAvailability = async (req, res, next) => {
    try {
        const query = await db.query(queries.getAllAvailability);
        return query.rows;
    } catch (err) {
        console.log(err);
    }
}

const getUniqueDates = async () => {
    try {
        const today = new Date();
        const query = await db.query(queries.getUniqueUpcomingAvailability, [today.toISOString().split('T')[0]]);
        return query.rows.map(date => new Date(date.route_date));
    } catch (err) {
        console.log(err);
    }
}

function sameDay(d1, d2) {
    //check day
    let isSame = false;
    if(d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()) {
        isSame = true;
    } else {
        isSame = false;
    }
    return isSame;
  }


function checkTechIsEqual(tech1, tech2) {
    return tech1 == tech2;
}

const updateSlotsAvailable = async (newValue, route_id) => {
    try {
        await db.query(queries.updateRouteAvailability, [newValue, route_id])
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
}

//controllers to export
const createDayRoute = async (req, res, next) => {
    try {
        const techs = await getAllTechs();
        const date = req.body.date;
        await createNewDayFromTechList(techs, date);
        res.status(200).send()
    } catch (err) {
        logger.error(err);
        res.status(400).send('Could not create a route')
    }
}

const getAllAvailability = async (req, res, next) => {
    try {
        const availability = await getAvailability();
        //console.log(availability);
        const techs = await getAllTechs();
        const uniqueDates = await getUniqueDates();
        //turn availability into an array
        const avaiabilityTable = [];
        //create the row date headers, then filter out the unique dates
        uniqueDates.forEach(day => avaiabilityTable.push([day]));
        avaiabilityTable.forEach((date, i) => {
            techs.forEach((tech) => {
                let slot = availability.find(route => {
                    const isSameDay = sameDay(route.route_date, new Date(date[0]));
                    const isTechEqual = checkTechIsEqual(route.tech_id, tech.tech_id);
                    //console.table({isSameDay, isTechEqual})
                    return (isSameDay && isTechEqual);
                });
                slot ? avaiabilityTable[i].push({tech_id: slot.tech_id, slots_available: slot.slots_available, route_id: slot.route_id}) : avaiabilityTable[i].push(null);
            })
        })

        res.status(200).send({techs: techs, avaiabilityTable})
    } catch (err) {
        console.log(err)
        res.status(400).send('Error retrieving availability')
    }
}

const setAvailability = async (req, res) => {
    try {
        const { newValue, routeId } = req.body;
        console.table({ newValue: Number(newValue), routeId})
        await updateSlotsAvailable(Number(newValue), routeId);
        res.status(200).send()
    } catch (err) {
        res.status(400).send('There was an error updating the database')
    }
}

module.exports = {
    getAllAvailability,
    createDayRoute,
    setAvailability
}