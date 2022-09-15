const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const db = require('../db');

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: 'https://www.'
}, 
    function(issuer, profile, cb) {
        db.query('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
            issuer,
            profile.id
          ], function(err, cred) {
            if(err) { return cb(err) }
            //if we can't find the user, make a new user
            if(!cred) {
                db.query('INSERT INTO users (name) VALUES (?)', [profile.displayName], function(err) {
                    if(err) { return cb(err) }
                })

                let id = this.lastID;
                db.query('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
                    id,
                    issuer,
                    profile.id
                ], function(err) {
                    if(err) { return cb(err); }
                    let user = {
                        id: id.toString(),
                        name: profile.displayName
                    };
                    return cb(null, user);
                })
            } else {
                //the google account has previously logged in to the app. Get the linked user
                db.get('SELECT * FROM users WHERE google_id = ?', [cred.user_id], function(err, user) {
                    if(err) { return cb(err); }
                    if(!user) {return cb(null, false) };
                    return cb(null, user);
                })
            }
          })
    }))