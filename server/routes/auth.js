const express = require('express');
const passport = require('passport');
const registerRouter = express.Router();
const loginRouter = express.Router();
const logoutRouter = express.Router();
const controllers = require('../controllers/auth');
const validateUserInfo = require('../helpers/validateUserInfo');
const validateUserLogin = require('../helpers/validateUserLogin');

//creates a new user
registerRouter.post('/', validateUserInfo, controllers.registerUser);

//authenticate the user
loginRouter.post('/', validateUserLogin, passport.authenticate('local'), (req, res, next) => {
    res.status(200).send();
    next();
}); 

logoutRouter.post('/', (req, res, next) => {
    req.logout((err) => {
        if(err) next(err);
        next();
    })
})

module.exports = {
    registerRouter,
    loginRouter,
    logoutRouter
};