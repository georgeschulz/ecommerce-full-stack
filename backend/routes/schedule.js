const express = require('express');
const router = express.Router();
const controllers = require('../controllers/schedule');

router.get('/cities', controllers.getCities);
router.get('/availability/user/:customerId', controllers.getAvailability);

module.exports = router;