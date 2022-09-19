const express = require('express');
const router = express.Router();
const checkIsAuthenticatedAdmin = require('../helpers/checkIsAuthenticatedAdmin');
const controllers = require('../controllers/admin');

//all of these will check if the deserialized user session contains user_type = Admin. Only CSRs should be able to access these resources
router.get('/schedule', checkIsAuthenticatedAdmin, controllers.getAllAvailability);
router.post('/routes/new', checkIsAuthenticatedAdmin, controllers.createDayRoute);
router.put('/routes', checkIsAuthenticatedAdmin, controllers.setAvailability);

module.exports = router;