const express = require('express');
const router = express.Router();
const controllers = require('../controllers/users');
const csurf = require('csurf');
const validateUserUpdate = require('../helpers/validateUserUpdate');

const csurfProtection = csurf({
    cookie: true
})

router.use(csurfProtection);

router.get('/getCSRFToken', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

router.get('/', controllers.getUserById);
router.put('/', validateUserUpdate, controllers.updateUser);

module.exports = router;