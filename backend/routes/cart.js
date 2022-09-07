const express = require('express');
const router = express.Router();
const controllers = require('../controllers/cart');
const bodyParser = require('body-parser');
const checkIsAuthenticated = require('../helpers/checkIsAuthenticated');

//routes for cart. An instance of router is used and exported. The controller functions are imported and used as callback options by using the properties in the controllers object
router.post('/service/:service_id', checkIsAuthenticated, express.json(), controllers.addServiceToCart);
router.get('/', checkIsAuthenticated, express.json(), controllers.getCartContents);
router.delete('/clear', checkIsAuthenticated, express.json(), controllers.clearCart);
router.delete('/:cart_id', checkIsAuthenticated, express.json(), controllers.deleteCartItem);
router.post('/stripe', checkIsAuthenticated, express.json(), controllers.createStripeSession);
router.post('/stripe/webhook',  bodyParser.raw({type: 'application/json'}), controllers.recievePayment);

module.exports = router;