const db = require('../db');
const bcrypt = require('bcrypt');
const queries = require('../queries');

const registerUser = async (req, response) => {
    //extract the form information from the request body, created at the signup form
    const {firstName, lastName, address, city, state, zip, email, phone, password, squareFeet} = req.body;
    
    //get their area ID for scheduling
    const areaIdQuery = await db.query(queries.getAreaId, [city]);
    const areaId = areaIdQuery.rows[0].area_id;

    //generate a salted hash with bcrypt to be stored as the password data in the customers table
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //get today's date to timestamp the day of user creation. This is used in the date_created part of the schema
    const today = new Date();
    const dateCreatedString = today.toISOString().split('T')[0];

    //Create a new row in the customers table with the form fill information and the salted hash in the password column
    db.query(queries.createCustomer, [firstName, lastName, address, city, state, zip, email, phone, hash, squareFeet, dateCreatedString, areaId], (err, res) => {
        //log any errors in console
        if(err) {
            console.log(err);
            res.status(401).send('Error: Could not create user');
        } else {
            //send back the user's information
            response.status(201).send('User successfully created');
        }
    })
}

module.exports = {
    registerUser
}