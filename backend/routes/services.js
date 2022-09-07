const express = require('express');
const router = express.Router();
const controllers = require('../controllers/services');

router.get('/', controllers.getAllServicesDetails);
router.get('/basic/:id', controllers.getServiceById);
router.get('/detail', controllers.getServiceDetailedByTarget);
router.get('/detail/:serviceId', controllers.getDetailedServiceById);
router.get('/:serviceId', controllers.getAllServicesDetailsById);

module.exports = router;