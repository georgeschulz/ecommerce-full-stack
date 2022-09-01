const queries = require('../queries');
const db = require('../db');
const calculatePrice = require('../helpers/calculatePrice');
const stripe = require('stripe')(process.env.STRIPEKEY);

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
    const { price } = serviceWithPricing;

    //delete any duplicate cart items (there is only ever the most recent instance of a service in the cart)
    await db.query(queries.deleteDuplicateCartItems, [customer_id, service_id])

    //Add the service to the cart
    const addServiceToCartQuery = await db.query(queries.addServiceToCart, [customer_id, service_id, price]);
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

const checkout = (req, res) => {
    //get the customer's information
    const { customer_id } = req.params;
    const { date_scheduled } = req.body;
    let authorized = true; //dummy value while we are not processing real payments

    if (authorized) { //check to make sure they have paid
        //once authorized, get the customer data so that we can create an order with the correct address
        db.query(queries.getUserById, [customer_id], (err, customerResults) => {
            if (err) {
                res.status(404).send('Error finding user.')
            } else {
                let customer = customerResults.rows[0];
                //Get data from cart for the user
                db.query(queries.getUserCart, [customer_id], (err, cartResults) => {
                    if (err) {
                        res.status(404).send('Error finding user cart')
                    } else if (cartResults.rows.length <= 0) {
                        //if the cart is empty, send an error status 
                        res.status(404).send('Error: Query returned an empty cart')
                    } else {
                        //add each cart item as an order
                        let cart = cartResults.rows;
                        //get today's date and format it to timestamp the order
                        const today = new Date();
                        const dateCreatedString = today.toISOString().split('T')[0];
                        //iterate over the contents of the cart to create a service order for each content of the cart
                        cart.forEach(item => {
                            db.query(queries.createOrder,
                                [item.service_id, dateCreatedString, date_scheduled, item.price, customer.address, customer.city, customer.state_abbreviation, customer.zip, customer.first_name, customer.last_name],
                                (err, result) => {
                                    if (err) {
                                        res.status(404).send('Error creating order')
                                    } else {
                                        //clear the cart once we've confirmed at the ordres have been created
                                        db.query(queries.clearCart, [customer_id], (err, result) => {
                                            if (err) {
                                                res.status(404).send('Error clearing cart')
                                            } else {
                                                res.status(201).send('Order succesfully placed');
                                            }
                                        })
                                    }
                                })
                        })
                    }
                })
            }
        })
    }
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
                unit_amount: item.price * 100,
                product_data: {
                    name: item.service_name,
                    description: item.description
                }
            },
            quantity: 1
        }
    })
    
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/order',
        cancel_url: 'http://localhost:3000/wizard/5',
        automatic_tax: {enabled: false}
    });

    res.status(200).send(session.url);
}

module.exports = {
    addServiceToCart,
    getCartContents,
    deleteCartItem,
    clearCart,
    checkout,
    createStripeSession
}