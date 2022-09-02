const express = require('express');
const router = express.Router();
const controllers = require('../controllers/cart');
const bodyParser = require('body-parser');

//routes for cart. An instance of router is used and exported. The controller functions are imported and used as callback options by using the properties in the controllers object
router.post('/:customer_id/service/:service_id', express.json(), controllers.addServiceToCart);
router.get('/:customer_id', express.json(), controllers.getCartContents);
router.delete('/:cart_id', express.json(), controllers.deleteCartItem);
router.delete('/clear/:customer_id', express.json(), controllers.clearCart);
router.post('/:customer_id/checkout', express.json(), controllers.checkout);
router.post('/stripe/customer/:customerId', express.json(), controllers.createStripeSession);
router.post('/stripe/webhook',  bodyParser.raw({type: 'application/json'}), controllers.recievePayment);

module.exports = router;