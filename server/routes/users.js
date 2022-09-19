const express = require('express');
const router = express.Router();
const controllers = require('../controllers/users');
const csurf = require('csurf');
const validateUserUpdate = require('../helpers/validateUserUpdate');
const checkIsAuthenticated = require('../helpers/checkIsAuthenticated');

//csurf protection to prevent against cross site forgery attacks. Start by configuring and adding it as route middleware
const csurfProtection = csurf({
    cookie: true
})

router.use(csurfProtection);

//send a csrf token to the front end to be sent alongside post requests in the forms of the site
router.get('/getCSRFToken', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

router.get('/', checkIsAuthenticated, controllers.getUserById);
router.put('/', checkIsAuthenticated, validateUserUpdate, controllers.updateUser);

module.exports = router;