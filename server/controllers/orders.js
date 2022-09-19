const queries = require('../queries');
const db = require('../db');
const logger = require('../logger');

//controller to get all of the orders in the order table for admin purposes
const getAllOrders = async (req, res) => {
    try {
        const ordersQuery = await db.query(queries.getAllOrders);
        res.status(200).send(ordersQuery.rows);
    } catch (err) {
        logger.error(err)
        res.status(404).send('There was an error getting the orders')
    }
}

//controller to get an order by order_id in the orders table 
const getOrderById = async (req, res) => {
    try {
        const { order_id } = req.params;
        const ordersQuery = await db.query(queries.getOrderById, [order_id]);
        res.status(200).send(ordersQuery.rows[0])
    } catch (err) {
        logger.error(err);
        res.status(404).send('There was an error finding your order');
    }
}

const getOrderByStripeSession = async (req, res) => {
    try {
        //stripe session is an identifier for the actual session on stripe end. We use it to get the details of the order on the success page since it can be provided by Stripe
        const { stripeSession } = req.params;
        const orderQuery = await db.query(queries.getOrderByStripeSession, [stripeSession]);
        const data = orderQuery.rows;
        if(data.length <= 0) {
            throw new Error('Your order could not be located')
        }

        //destructure the order - could this have been better done with the spread operator?
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
        
        //retstructure the values for the response
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
            //turn items into an array of items
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
    } catch (err) {
        logger.error(err)
        res.status(404).send('There was an error retrieving your order')
    }
}


module.exports = {
    getAllOrders,
    getOrderById,
    getOrderByStripeSession
};