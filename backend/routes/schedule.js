const express = require('express');
const router = express.Router();
const controllers = require('../controllers/schedule');

router.get('/cities', controllers.getCities);

module.exports = router;