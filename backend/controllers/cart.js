const queries = require('../queries');
const db = require('../db');
const calculatePrice = require('../helpers/calculatePrice');
const { application, response } = require('express');
const stripe = require('stripe')(process.env.STRIPEKEY);
const endpointSecret = process.env.WEBHOOKSECRET;

//controller that adds a service to the cart
const addServiceToCart = async (req, res) => {
    try {
         //extract parameters for api call from params (url) and request body
        const { service_id } = req.params;
        const customer_id = req.user.customer_id;
        const { target } = req.body;
        
        if (target.length <= 0) {
            //handle cases where the user forgets to add a body to their request
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
    } catch (e) {
        res.status(404).send('Error: Missing either service or selected target.');
    }
   
}

//Controller to return the cart contents of a specific user joined with more information about the service
const getCartContents = async (req, res) => {
    try {
        const customer_id = req.user.customer_id;
        const userCartQuery = await db.query(queries.getUserCart, [customer_id]);
        const userCart = userCartQuery.rows;

        res.status(200).send(userCart)
    } catch (e) {
        //send an empty cart if the cart can't be found or is empty
        res.status(404).send([])
    }
}

//controller to delte a specific cart item by the item's id
const deleteCartItem = async (req, res) => {
    try {
        const { cart_id } = req.params;
        await db.query(queries.deleteCartItem, [cart_id]);
        res.status(200).send();
    } catch (err) {
        res.status(404).send('Error removing item from cart');
        console.log(err)
    }
}

//controller to clear the cart of all contents for a specific user
const clearCart = async (req, res) => {
    try {
        const customer_id = req.user.customer_id;
        await db.query(queries.clearCart, [customer_id]);
        res.status(200).send()
    } catch (err) {
        console.log(err);
        res.status(404).send('Could not clear user cart')
    }
}

const createStripeSession = async (req, res) => {
    //get the contents of the customer's cart
    const customer_id = req.user.customer_id;

    const cartQuery = await db.query(queries.getUserCart, [customer_id]);
    const cart = cartQuery.rows;

    //structure the cart contents to prepare them for stripe's formatting
    const lineItems = await cart.map(item => {
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
        success_url: `http://localhost:3000/order?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: 'http://localhost:3000/wizard/5',
        automatic_tax: { enabled: false },
        client_reference_id: customer_id
    });

    res.status(200).send(session.url);
}

const createOrder = async (dateCreated, customerId, dateScheduled, address, city, state, zip, firstName, lastName, routeId, amountPaid, stripePayment, stripeSession) => {
    try {
        const response = await db.query(queries.createOrder, [
            dateCreated,
            customerId,
            dateScheduled,
            address,
            city,
            state,
            zip,
            firstName,
            lastName,
            routeId,
            amountPaid,
            'G',
            Date.now(),
            stripePayment,
            stripeSession
        ]);
        
        const orderId = await db.query(queries.getMostRecentOrderId, [customerId]);
        return orderId.rows[0].order_id;
    } catch(e) {
        console.log(e);
        return false;
    }
}

const fufillOrder = async (session) => {
    const { amount_total, client_reference_id, payment_intent, id } = session;
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
    const orderId = await createOrder(dateCreatedString, client_reference_id, route.route_date, customer.address, customer.city, customer.state_abbreviation, customer.zip, customer.first_name, customer.last_name, route.route_id, amount_total, payment_intent, id)

    //add the cart items
    await cart.forEach(item => {
        db.query(queries.addItem, [orderId, item.service_id, item.price, item.billing_amount, item.billing_type, item.setup_fee])
    })

    //decrement the availability on that day by 1 so the technician isn't overbooked
    try {
        await db.query(queries.decrementRouteAvailability, [route.route_id]);
    } catch (e) {
        console.log('Error decrementing route availability')
    }
    

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
            response.status(200).end()
        }
    } else {
        response.status(400).end()
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