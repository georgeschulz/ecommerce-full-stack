const express = require('express');
const router = express.Router();
const controllers = require('../controllers/services');

router.get('/', controllers.getAllServices);
router.get('/basic/:id', controllers.getServiceById);
router.get('/detail', controllers.getServiceDetailedByTarget);
router.get('/detail/:serviceId', controllers.getDetailedServiceById);

module.exports = router;