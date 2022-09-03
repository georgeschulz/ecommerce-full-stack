const queries = require('../queries');
const db = require('../db');
const calculatePrice = require('../helpers/calculatePrice');
const { application, response } = require('express');
const stripe = require('stripe')(process.env.STRIPEKEY);
const endpointSecret = process.env.WEBHOOKSECRET;

//controller that adds a service to the cart
const addServiceToCart = async (req, res) => {
    //extract parameters for api call from params (url) and request body
    const { customer_id, service_id } = req.params;
    const { target } = req.body;
    
    if (target.length <= 0) {
         //handle cases where the user forgets to add a body to their request
        res.status(404).send('Please include a body for your request with a property, target, containing a list of string names of pests');
        throw new Error('Please add a target')
    }

    //get the service parameters to calculate pricing correctly
    const serviceParameterQuery = await db.query(queries.getServiceById, [service_id]);
    const service = serviceParameterQuery.rows[0];
    //update the service object to have the cost information in it
    const serviceWithPricing = await calculatePrice(service, customer_id, target);
    const { price, setup_fee, billing_amount, billing_type } = serviceWithPricing;

    //delete any duplicate cart items (there is only ever the most recent instance of a service in the cart)
    await db.query(queries.deleteDuplicateCartItems, [customer_id, service_id])

    //Add the service to the cart
    const addServiceToCartQuery = await db.query(queries.addServiceToCart, [customer_id, service_id, price, setup_fee, billing_amount, billing_type]);
    res.status(201).send({message: 'Success', data: serviceWithPricing});
}

//Controller to return the cart contents of a specific user joined with more information about the service
const getCartContents = (req, res) => {
    const { customer_id } = req.params;
    db.query(queries.getUserCart, [customer_id], (err, results) => {
        if (err) {
            res.status(404).send('Error performing request. Please try again')
        } else if (results.rows.length <= 0) {
            //return an empty array if the customer_id had no corresponding contents
            res.status(404).send([])
        } else {
            //send back the results if successful
            res.status(200).send(results.rows)
        }
    })
}

//controller to delte a specific cart item by the item's id
const deleteCartItem = (req, res) => {
    const { cart_id } = req.params;
    //query and handle results
    db.query(queries.deleteCartItem, [cart_id], (err, result) => {
        if (err) {
            res.status(404).send('Error removing item from cart');
        } else {
            res.status(204).send('Cart with id ' + cart_id + ' deleted');
        }
    })
}

//controller to clear the cart of all contents for a specific user
const clearCart = (req, res) => {
    const { customer_id } = req.params;
    db.query(queries.clearCart, [customer_id], (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(200).send('Cart successfully cleared');
        }
    })
}

const createStripeSession = async (req, res) => {
    //get the contents of the customer's cart
    const { customerId } = req.params;
    const { date_scheduled } = req.body;

    //get the customer so we can make an order with their correct contact/address
    const customerQuery = await db.query(queries.getUserById, [customerId]);
    const customer = customerQuery.rows[0];

    const cartQuery = await db.query(queries.getUserCart, [customerId]);
    const cart = cartQuery.rows;


    //structure the cart contents to prepare them for stripe's formatting
    const lineItems = cart.map(item => {
        return {
            price_data: {
                currency: 'usd',
                unit_amount: item.setup_fee * 100,
                product_data: {
                    name: `${item.service_name} Setup Fee`,
                    description: `Setup fee is $${item.setup_fee}, then you will be billed $${item.billing_amount} per ${item.billing_type}. ${item.description}`
                }
            },
            quantity: 1
        }
    })
    
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: `http://localhost:3000/order`,
        cancel_url: 'http://localhost:3000/wizard/5',
        automatic_tax: {enabled: false},
        client_reference_id: customerId
    });

    res.status(200).send(session.url);
}

const createOrder = async (dateCreated, customerId, dateScheduled, price, serviceId, address, city, state, zip, firstName, lastName, routeId, setupTotal, billingAmount, billingType) => {
    try {
        await db.query(queries.createOrder, [
            dateCreated,
            customerId,
            dateScheduled,
            price,
            serviceId,
            address,
            city,
            state,
            zip,
            firstName,
            lastName,
            routeId,
            setupTotal,
            billingAmount,
            billingType
        ])
    } catch(e) {
        console.log(e);
        return false;
    }
    
}

const fufillOrder = async (session) => {
    const { amount_total, client_reference_id } = session;
    const today = new Date();
    const dateCreatedString = today.toISOString().split('T')[0];

    //get the customer's personal information
    const customerQuery = await db.query(queries.getUserById, [client_reference_id]);
    const customer = customerQuery.rows[0];

    //get the customer's cart contents
    const cartQuery = await db.query(queries.getUserCart, [client_reference_id]);
    const cart = cartQuery.rows;

    //get the route data
    const routeQuery = await db.query(queries.getRouteById, [cart[0].route_id]);
    const route = routeQuery.rows[0];
    
    //create the order with the parameters extracted from other tables
    cart.forEach(item => {
        createOrder(
            dateCreatedString,
            client_reference_id,
            route.route_date,
            item.price,
            item.service_id,
            customer.address,
            customer.city,
            customer.state_abbreviation,
            customer.zip,
            customer.first_name,
            customer.last_name,
            item.route_id,
            item.setup_fee,
            item.billing_amount,
            item.billing_type
        )
    })

    //clear the user's cart once their orders have been generated
    await db.query(queries.clearCart, [client_reference_id])
}

const recievePayment = (request, response) => {
    let event = request.body;

    if(endpointSecret) {
        const signature = request.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                request.body,
                signature,
                endpointSecret
            );
        } catch (err) {
            console.log(err.message)
            return response.status(400).send();
        }
    }

    if(event.type = 'checkout.session.completed') {
        const session = event.data.object;
        if(session.payment_status === 'paid') {
            fufillOrder(session);
        }
    } else {
        res.status(400).end()
    }
}

module.exports = {
    addServiceToCart,
    getCartContents,
    deleteCartItem,
    clearCart,
    createStripeSession,
    recievePayment
}