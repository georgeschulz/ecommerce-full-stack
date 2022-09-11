require('dotenv').config(); //this adds in the envirornment variables
const express = require('express');
const app = express();
const port = process.env.PORT;
const morgan = require('morgan');
//routers
const registerRouter = require('./routes/auth').registerRouter;
const loginRouter = require('./routes/auth').loginRouter;
const usersRouter = require('./routes/users');
const servicesRouter = require('./routes/services');
const cartRouter = require('./routes/cart');
const ordersRouter = require('./routes/orders');
const targetRouter = require('./routes/targets');
const scheduleRouter = require('./routes/schedule');
const logoutRouter = require('./routes/auth').logoutRouter;
//const passport = require('passport'); //passport library to initialize it
const session = require('express-session'); //creates a session
var cors = require('cors');  
const passport = require('passport');
const store = require('./services/session');
const checkIsAuthenticated = require('./helpers/checkIsAuthenticated');
const toobusy = require('toobusy-js');
const logger = require('./logger');
const bouncer = require('express-bouncer')(500, 900000, 20);
const hpp = require('hpp')

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(require('cookie-parser')()); // this middleware parses cookies sent with HTTP requests
app.use(morgan('dev'));


//implement too-busy per OSWAP to protect against DDOS attacks
app.use((req, res, next) => {
    if(toobusy()) {
        logger.error("Server is overloaded. Possible DDOS attack");
        res.status(503).send('Server too busy');
    } else {
        next();
    }
})

//prevent http parameter pollution
app.use(hpp());

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

//add routes as middleware
app.use('/register', express.json(), registerRouter);
app.use('/login', bouncer.block, express.json(), loginRouter);
app.use('/users', express.json(), checkIsAuthenticated, usersRouter);
app.use('/services', express.json(), servicesRouter);
app.use('/cart', cartRouter);
app.use('/orders', checkIsAuthenticated, express.json(), ordersRouter);
app.use('/target', express.json(), targetRouter);
app.use('/schedule', express.json(),  scheduleRouter);
app.use('/logout', logoutRouter)

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
}) 