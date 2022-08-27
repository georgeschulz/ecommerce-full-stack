const express = require('express');
const router = express.Router();
const controllers = require('../controllers/services');

router.get('/', controllers.getAllServices);
router.get('/:id', controllers.getServiceById);
router.get('/detail/user/:id', controllers.getServiceDetailedByTarget);

module.exports = router;