const express = require('express');
const router = express.Router();
const controllers = require('../controllers/services');

router.get('/', controllers.getAllServicesDetails);
router.get('/detail', controllers.getServiceDetailedByTarget);
router.get('/detail/:serviceId', controllers.getDetailedServiceById);
router.get('/featured', controllers.getFeaturedServices);
router.get('/:serviceId', controllers.getAllServicesDetailsById);

module.exports = router;