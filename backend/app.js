require('dotenv').config(); //this adds in the envirornment variables
const express = require('express');
const app = express();
const port = process.env.PORT;
//routers
const registerRouter = require('./routes/auth').registerRouter;
const loginRouter = require('./routes/auth').loginRouter;
const usersRouter = require('./routes/users');
const servicesRouter = require('./routes/services');
const cartRouter = require('./routes/cart');
const ordersRouter = require('./routes/orders');
const targetRouter = require('./routes/targets');
const scheduleRouter = require('./routes/schedule');
//const passport = require('passport'); //passport library to initialize it
const session = require('express-session'); //creates a session
var cors = require('cors');  
const passport = require('passport');
const store = require('./services/session');

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(require('cookie-parser')()); // this middleware parses cookies sent with HTTP requests

//setup an express session
app.use(
    session({
        store: store,
        secret: process.env.SESSIONSECRET,
        cookie: { 
            maxAge: 172000000
        },
        saveUninitialized: true,
        resave: false,
        sameSite: 'none',
        secure: true
    })
);

//Passport configuration; boilerplate code that adds passport as middlware
app.use(passport.initialize());
app.use(passport.session());

require('./services/passport'); //add in passport confirguation

//protect routes where the user is not authorized
const checkIsAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    res.status(401).send({msg: 'User is an authorized to access this resource', link: '/login'});
}

//add routes as middleware
app.use('/register', express.json(), registerRouter);
app.use('/login', express.json(), loginRouter);
app.use('/users', express.json(), checkIsAuthenticated, usersRouter);
app.use('/services', express.json(), checkIsAuthenticated, servicesRouter);
app.use('/cart', checkIsAuthenticated, cartRouter);
app.use('/orders', checkIsAuthenticated, express.json(), ordersRouter);
app.use('/target', express.json(), targetRouter);
app.use('/schedule', express.json(),  scheduleRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
}) 