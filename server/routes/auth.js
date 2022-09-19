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

//model function usd to get data abotu a customer
const getCustomerById = async (id) => {
    try {
        const customerQuery = await db.query(queries.getUserById, [id]);
        return customerQuery.rows[0];
    } catch (err){
        console.log(err)
    }
}

//authenticate the user using passport local strategy. Send back their level to partially handle access to admin protected routes in front end
loginRouter.post('/', validateUserLogin, passport.authenticate('local'), async (req, res, next) => {
    const customer = await getCustomerById(req.user.customerID);
    res.status(200).send(customer.user_level);
    next();
});

//this route is used to redirect the user to google auth page
loginRouter.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

//this route recieves the redirect from the google auth page
loginRouter.get('/google-account',
    passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
    function (req, res) {
        //check if they've setup their account yet
        let isSetup = false;
        const { customerID } = req.user;

        (async () => {
            try {
                //check if the customer has already added their contact info or if we need to send them to a page to finish that up
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

//simple route to handle logout requests
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