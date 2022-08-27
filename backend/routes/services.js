const express = require('express');
const router = express.Router();
const controllers = require('../controllers/services');

router.get('/', controllers.getAllServices);
router.get('/:id', controllers.getServiceById);
router.get('/detail/user/:id', controllers.getServiceDetailedByTarget);
router.get('/detail/user/:id/service/:serviceId', controllers.getDetailedServiceById);

module.exports = router;