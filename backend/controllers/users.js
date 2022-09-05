const queries = require('../queries');
const db = require('../db');

//get all of the users
const getUsers = (req, res) => {
    db.query(queries.getUsers, (err, results) => {
        if(err) throw(err);
        res.status(200).send(results.rows);
    })
}

//get a specific user by the customer_id
const getUserById = (req, res) => {
    const id = req.user.customer_id;
    db.query(queries.getUserById, [id], (err, results) => {
        if(err) {
            res.status(404).send({msg: 'Could not find user'});
        } else if (results.rows.length <= 0) {
            res.status(404).send({users: []}); //send an error when no customers are found for that ID
        } else {
            console.log('success')
            res.send({users: results.rows});
        }
    })
}

const updateUser = async (req, res) => {
    const id = req.user.customer_id;
    const { firstName, lastName, address, city, state, zip, email, phone, squareFeet} = req.body; //get the parameters to update from the request

    try {
        db.query(queries.updateCustomer, [
            firstName,
            lastName,
            address,
            city,
            state,
            zip,
            phone,
            email,
            squareFeet,
            id
        ])
        res.status(200).send({msg: 'Successful update to the user'})
    } catch (e) {
        console.log(e)
        res.status(400).send({msg: 'Error updating the account'})
    }
}

module.exports = {
    getUsers,
    getUserById,
    updateUser
}