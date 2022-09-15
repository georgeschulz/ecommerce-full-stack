const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oidc');
const bcrypt = require('bcrypt');//passport configuration that allows passport to lookup information in db and compare it to user submissions
const db = require('../db');
const queries = require('../queries');

passport.use(new LocalStrategy(function verify(username, password, cb) {
    //query the databse to find if a customer matches the submitted email, used as a username
    db.query(queries.checkUserAuth, [username], function (err, result) {
        //handle errors and mismatches
        if (err) return cb(err)
        if (result.rows.length <= 0) return cb(null, false, { message: 'Incorrect username or password' })
        //if it passes the checks to make sure the customer exists, check the password
        bcrypt.compare(password, result.rows[0].password, function (err, check) {
            if (err) {
                //handle basic errors
                return cb();
            } else if (check) {
                //this code runs if the authorization is successful
                //this returns the customer ID at the moment
                return cb(null, { customerID: result.rows[0].customer_id })
            } else {
                //this part of the code runs when the user matches, but they use the wrong password
                return cb(null, false);
            }
        })
    })
}));

//google strategy
passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: 'https://www.pest-control-ecommerce.herokuapp.com/login/google-account'
},
    function (issuer, profile, cb) {
        db.query('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
            issuer,
            profile.id
        ], function (err, cred) {
            if (err) { return cb(err) }
            //if we can't find the user, make a new user
            if (!cred) {
                db.query('INSERT INTO customers (email) VALUES ($1)', [profile.emails[0].value], function (err) {
                    if (err) { return cb(err) }
                    let id = this.lastID;
                    db.query('INSERT INTO federated_credentials (customer_id, provider, subject) VALUES (?, ?, ?)', [
                        id,
                        issuer,
                        profile.id
                    ], function (err) {
                        if (err) { return cb(err); }
                        let user = {
                            id: id.toString(),
                            name: profile.displayName
                        };
                        return cb(null, user);
                    })
                })
            } else {
                //the google account has previously logged in to the app. Get the linked user
                db.get('SELECT * FROM customers WHERE customer_id = ?', [cred.customer_id], function (err, user) {
                    if (err) { return cb(err); }
                    if (!user) { return cb(null, false) };
                    return cb(null, user);
                })
            }
        })
    }))

//serialize the user
passport.serializeUser(function (user, done) {
    done(null, user.customerID);
})

//deserialize the user
passport.deserializeUser(function (customerID, done) {
    db.query(queries.getUserById, [customerID], (err, result) => {
        done(null, result.rows[0])
    })
})