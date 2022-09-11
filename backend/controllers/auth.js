const db = require('../db');
const bcrypt = require('bcrypt');
const queries = require('../queries'); 

const registerUser = async (req, res, next) => {
    //extract the form information from the request body, created at the signup form
    const { firstName, lastName, address, city, state, zip, email, phone, password, squareFeet } = req.body;

    try {
        //get their area ID for scheduling
        const areaIdQuery = await db.query(queries.getAreaId, [city]);
        if(areaIdQuery.rows.length <= 0) {
            throw new Error('Can not create customer because we don not have a valid area ID')
        }
        const areaId = areaIdQuery.rows[0].area_id;

        //generate a salted hash with bcrypt to be stored as the password data in the customers table
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        //get today's date to timestamp the day of user creation. This is used in the date_created part of the schema
        const today = new Date();
        const dateCreatedString = today.toISOString().split('T')[0];

        //Create a new row in the customers table with the form fill information and the salted hash in the password column
        await db.query(queries.createCustomer, [firstName, lastName, address, city, state, zip, email, phone, hash, squareFeet, dateCreatedString, areaId])
        res.status(201).send('User successfully created');
  
    } catch (err) {
        //handle errors where the email already exists
        if(err.constraint === 'unique_email') {
            console.log('Email already exists: ' + err.detail);
            res.status(401).send('Error: An account with this email already exists. Please log into your current account of create an accont with a different email');
        } else {
            console.log(err)
            if(err.message = 'Can not create customer because we don not have a valid area ID')
            res.status(401).send('It looks like we did not recognize the city you entered. Please try another city name that we might recognize in the drop down box for city.');
        }
    }
}



module.exports = {
    registerUser
}