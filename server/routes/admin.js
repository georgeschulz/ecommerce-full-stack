const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const checkIsAuthenticatedAdmin = require('../helpers/checkIsAuthenticatedAdmin');
const controllers = require('../controllers/admin');

router.get('/schedule', checkIsAuthenticatedAdmin, controllers.getAllAvailability);
router.post('/routes/new', checkIsAuthenticatedAdmin, controllers.createDayRoute);

module.exports = router;