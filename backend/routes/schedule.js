const express = require('express');
const router = express.Router();
const controllers = require('../controllers/schedule');

router.get('/cities', controllers.getCities);
router.get('/availability', controllers.getAvailability);
router.put(`/route/:routeId`, controllers.setAppointmentDate);

module.exports = router;