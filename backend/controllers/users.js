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
            res.send({users: results.rows});
        }
    })
}

const updateUser = async (req, res) => {
    const id = req.user.customer_id;
    const { firstName, lastName, address, city, state, zip, email, phone, squareFeet} = req.body; //get the parameters to update from the request
    let area_id = 1;

    //get the area id to make sure scheduling works properly down the road
    try {
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
        ])
    } catch (err) {
        console.log(err)
        res.status(400).send({msg: 'Error updating the account'})   
   
    }


    res.status(200).send({msg: 'Successful update to the user'})
}

module.exports = {
    getUsers,
    getUserById,
    updateUser
}