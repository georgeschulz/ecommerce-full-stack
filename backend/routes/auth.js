const express = require('express');
const passport = require('passport');
const registerRouter = express.Router();
const loginRouter = express.Router();
const controllers = require('../controllers/auth');

//creates a new user
registerRouter.post('/', controllers.registerUser);

//sends you to a login page; currently being used only for testing purposes
loginRouter.get('/', (req, res) => res.send('Login page'))

//authenticate the user
loginRouter.post('/', passport.authenticate('local'), (req, res, next) => {
    const customerId = req.user.customerID;
    res.status(200).send({id: customerId});
    next();
}); 

module.exports = {
    registerRouter,
    loginRouter
};