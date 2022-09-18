const express = require('express');
const passport = require('passport');
const registerRouter = express.Router();
const loginRouter = express.Router();
const logoutRouter = express.Router();
const controllers = require('../controllers/auth');
const db = require('../db');
const validateUserInfo = require('../helpers/validateUserInfo');
const validateUserLogin = require('../helpers/validateUserLogin');
const queries = require('../queries');

//creates a new user
registerRouter.post('/', validateUserInfo, controllers.registerUser);

const getCustomerById = async (id) => {
    try {
        const customerQuery = await db.query(queries.getUserById, [id]);
        return customerQuery.rows[0];
    } catch (err){
        console.log(err)
    }
}

//authenticate the user
loginRouter.post('/', validateUserLogin, passport.authenticate('local'), async (req, res, next) => {
    console.log(req.user.customerID);
    const customer = await getCustomerById(req.user.customerID);
    console.log(customer.user_level);
    res.status(200).send(customer.user_level);
    next();
});

loginRouter.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

loginRouter.get('/google-account',
    passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
    function (req, res) {
        //check if they've setup their account yet
        let isSetup = false;
        const { customerID } = req.user;

        (async () => {
            try {
                const customerQuery = await db.query(queries.getUserById, [customerID])
                const { first_name, last_name, phone, address, city, state_abbreviation, zip, square_feet } = customerQuery.rows[0];
                isSetup = first_name && last_name && phone && address && city && state_abbreviation && zip && square_feet ? true : false;

            } catch (err) {
                console.log(err)
            }
            //handle routing based on whether it's production from auth based on whether it's production or dev
            if (process.env.NODE_ENV === 'production') {
                res.redirect('/google/account-setup?isSetup=' + isSetup);
            } else {
                res.redirect('http://localhost:3000/google/account-setup?isSetup=' + isSetup);
            }
        })();

    }
)

logoutRouter.post('/', (req, res, next) => {
    req.logout((err) => {
        if (err) next(err);
        next();
    })
})

module.exports = {
    registerRouter,
    loginRouter,
    logoutRouter
};