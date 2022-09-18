const express = require('express');
const router = express.Router();
const controllers = require('../controllers/orders');
const checkIsAuthenticatedAdmin = require('../helpers/checkIsAuthenticatedAdmin')

router.get("/", checkIsAuthenticatedAdmin, controllers.getAllOrders);
router.get("/:order_id", checkIsAuthenticatedAdmin,controllers.getOrderById);
router.get("/stripe/:stripeSession", controllers.getOrderByStripeSession)

module.exports = router;