const queries = require('../queries');
const db = require('../db');

//controller to get all of the orders in the order table for admin purposes
const getAllOrders = (req, res) => {
    db.query(queries.getAllOrders, (err, results) => {
        if(err) {
            res.status(404).send('Error retrieving orders')
        } else {
            res.status(200).send(results.rows);
        }
    })
}

//controller to get an order by order_id in the orders table 
const getOrderById = (req, res) => {
    const { order_id } = req.params;
    db.query(queries.getOrderById, [order_id], (err, result) => {
        if(err) {
            res.status(404).send('Error finding orders')
        } else if (result.rows.length <= 0) {
            res.status(404).send('No orders found with this ID'); //this handles the error when no orders are found for the order_id
        } else {
            res.status(200).send(result.rows[0]);
        }
    })
}

const getOrderByStripeSession = async (req, res) => {
    const { stripeSession } = req.params;
    const orderQuery = await db.query(queries.getOrderByStripeSession, [stripeSession]);
    const data = orderQuery.rows;

    const { 
        first_name, 
        last_name, 
        email, 
        phone, 
        date_created, 
        date_scheduled, 
        address, 
        city, 
        state, 
        zip, 
        amount_paid, 
        tech_first_name, 
        tech_last_name, 
        tech_profile_pic } = data[0];

    const orderResponse = {
        first_name,
        last_name,
        email,
        phone,
        date_created,
        date_scheduled,
        address,
        city,
        state,
        zip,
        amount_paid,
        tech_first_name,
        tech_last_name,
        tech_profile_pic,
        items: data.map(item => {
            const { service_name, frequency, price, billing_amount, billing_type, setup_fee } = item;
            return {
                service_name,
                frequency,
                price,
                billing_amount,
                billing_type,
                setup_fee
            }
        })
    }
    res.status(200).send(orderResponse)
}


module.exports = {
    getAllOrders,
    getOrderById,
    getOrderByStripeSession
};