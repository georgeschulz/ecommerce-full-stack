const queries = require('../queries');
const db = require('../db');
const logger = require('../logger');

//get all of the users
const getUsers = async (req, res) => {
    try {
        const usersQuery = await db.query(queries.getUsers);
        const users = usersQuery.rows;
        res.status(200).send(users);
    } catch (err) {
        logger.error(err);
        res.status(404).send('There was an error getting a list of users');
    }
}

//get a specific user by the customer_id
const getUserById = async (req, res) => {
    try {
        const id = req.user.customer_id;
        const userQuery = await db.query(queries.getUserById, [id]);
        const user = userQuery.rows;
        res.status(200).send({users: user})

    } catch (err) {
        logger.error(err);
        res.status(404).send('There was an error finding the user');
    }
}

const updateUser = async (req, res) => {
    //get the area id to make sure scheduling works properly down the road
    try {
        const id = req.user.customer_id;
        const { firstName, lastName, address, city, state, zip, email, phone, squareFeet} = req.body; //get the parameters to update from the request
        let area_id = 1;
        const areaIdQuery = await db.query(queries.getAreaId, [city]);
        area_id = areaIdQuery.rows[0].area_id;

        await db.query(queries.updateCustomer, [
            firstName,
            lastName,
            address,
            city,
            state,
            zip,
            phone,
            email,
            squareFeet,
            area_id,
            id
        ]);
        res.status(200).send({msg: 'Successful update to the user'})
    } catch (err) {
        logger.error(err);
        res.status(400).send({msg: 'Error updating the account'})   
    }
}

module.exports = {
    getUsers,
    getUserById,
    updateUser
}