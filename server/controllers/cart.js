const queries = require('../queries');
const db = require('../db');
const calculatePrice = require('../helpers/calculatePrice');
const logger = require('../logger');
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
        await db.query(queries.addServiceToCart, [customer_id, service_id, price, setup_fee, billing_amount, billing_type]);
        res.status(201).send({ message: 'Success', data: serviceWithPricing });
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
        logger.error(err);
    }
}

//controller to clear the cart of all contents for a specific user
const clearCart = async (req, res) => {
    try {
        const customer_id = req.user.customer_id;
        await db.query(queries.clearCart, [customer_id]);
        res.status(200).send()
    } catch (err) {
        logger.error(err);
        res.status(404).send('Could not clear user cart')
    }
}

//this creates a stripe session, which is basically a checkout page at a unique URL based on the inputs to this fxn
const createStripeSession = async (req, res) => {
    try {
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

        //create the session. note that the redirect urls change based on the enviornment since you need a full path from the 3rd party site
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: process.env.NODE_ENV === 'production' ? `https://pest-control-ecommerce.herokuapp.com/confirmation?session_id={CHECKOUT_SESSION_ID}` : 'http://localhost:3000/confirmation?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: process.env.NODE_ENV === 'production' ? 'https://pest-control-ecommerce.herokuapp.com/wizard/5' : 'http://localhost:3000/wizard/5',
            automatic_tax: { enabled: false },
            client_reference_id: customer_id
        });

        //send the url to the front end for the useNavigate hook
        res.status(200).send(session.url);
    } catch (err) {
        logger.error(err);
        res.status(400).send();
    }
   
}

const createOrder = async (dateCreated, customerId, dateScheduled, address, city, state, zip, firstName, lastName, routeId, amountPaid, stripePayment, stripeSession) => {
    //this logic creates an order in the database
    try {
        await db.query(queries.createOrder, [
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

        //return the order ID from the function
        const orderId = await db.query(queries.getMostRecentOrderId, [customerId]);
        return orderId.rows[0].order_id;
    } catch (err) {
        logger.error(err);
        return false;
    }
}

const fufillOrder = async (session) => {
    try {
        const { amount_total, client_reference_id, payment_intent, id } = session;
        const today = new Date();
        const dateCreatedString = today.toISOString().split('T')[0];

        //get the customer's personal information
        const customerQuery = await db.query(queries.getUserById, [client_reference_id]);
        const customer = customerQuery.rows[0];

        if (!customer) {
            throw new Error('We could not find your account to place your order.');
        }

        //get the customer's cart contents
        const cartQuery = await db.query(queries.getUserCart, [client_reference_id]);
        const cart = cartQuery.rows;

        if (cart.length <= 0) {
            throw new Error('It looks like your cart was empty. Please add items to you cart and try again');
        }

        //get the route data
        const routeQuery = await db.query(queries.getRouteById, [cart[0].route_id]);
        const route = routeQuery.rows[0];

        if (!route) {
            throw new Error('The appointment could not be found. Pleasea try again.')
        }

        //create the order with the parameters extracted from other tables
        const orderId = await createOrder(dateCreatedString, client_reference_id, route.route_date, customer.address, customer.city, customer.state_abbreviation, customer.zip, customer.first_name, customer.last_name, route.route_id, amount_total, payment_intent, id)
        if (!orderId) {
            throw new Error('There was an unknown error creating your order');
        }

        //add the cart items
        await cart.forEach(item => {
            db.query(queries.addItem, [orderId, item.service_id, item.price, item.billing_amount, item.billing_type, item.setup_fee])
        })

        //decrement the availability on that day by 1 so the technician isn't overbooked
        await db.query(queries.decrementRouteAvailability, [route.route_id]);

        //clear the user's cart once their orders have been generated
        await db.query(queries.clearCart, [client_reference_id])
    } catch (err) {
        logger.error(err)
    }

}

//controller that is listening on the stripe webhook route. It runs biz logic to fulffill order if stripe let's us know a payment has happned.
const recievePayment = (request, response) => {
    let event = request.body;
    //the endpoint secret is unique to each webhook and stored in .env file
    if (endpointSecret) {
        //this header has to be added to confirm that our request is coming from Stripe (not a hacker)
        const signature = request.headers['stripe-signature'];
        try {
            //create the actual webook here
            event = stripe.webhooks.constructEvent(
                request.body,
                signature,
                endpointSecret
            );
        } catch (err) {
            logger.error(err)
            return response.status(400).send();
        }
    }

    //when the event is sent signaling that the checkout has been done, this runs -> fufilling the order
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        if (session.payment_status === 'paid') {
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