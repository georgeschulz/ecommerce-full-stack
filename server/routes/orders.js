const express = require('express');
const router = express.Router();
const controllers = require('../controllers/orders');

router.get("/", controllers.getAllOrders);
router.get("/:order_id", controllers.getOrderById);
router.get("/stripe/:stripeSession", controllers.getOrderByStripeSession)

module.exports = router;