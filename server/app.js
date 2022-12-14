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
const adminRouter = require('./routes/admin');
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
const helmet = require('helmet');
const path = require('path');

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(require('cookie-parser')()); // this middleware parses cookies sent with HTTP requests
app.use(morgan('dev'));
app.use(express.static('../client/build'));

//handle uncaught exceptions that cause the app to be in an unknown state
process.on("uncaughtException", (err) => {
    logger.error("Uncaught exception: ", err);
    process.exit();
})

//using helmet to configure security settings in http headers
app.use(helmet.frameguard({ action: 'deny' })); //stops clickjacking attacks via iframes
app.use(helmet.xssFilter()); //helps with xss protection
app.use(helmet.noSniff()) //prevents meddling with content-type header
app.use(helmet.ieNoOpen()) //this prevents internet explorer from executing downloads
app.use(helmet.hidePoweredBy()) //this one prevents the header's including info about the backend tech stack

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
            maxAge: 172000000,
            httpOnly: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: 'lax'
        },
        saveUninitialized: true,
        resave: false,
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production' ? true : false
    })
);

//Passport configuration; boilerplate code that adds passport as middlware
app.use(passport.initialize());
app.use(passport.session());

require('./services/passport'); //add in passport confirguation

//add routes as middleware
app.use('/register', express.json(), registerRouter);
app.use('/login', bouncer.block, express.json(), loginRouter);
app.use('/users', express.json(), usersRouter);
app.use('/services', express.json(), servicesRouter);
app.use('/cart', cartRouter);
app.use('/orders', express.json(), ordersRouter);
app.use('/target', express.json(), targetRouter);
app.use('/schedule', express.json(),  scheduleRouter);
app.use('/logout', logoutRouter);
app.use('/admin', express.json(), adminRouter);

//create a general route for accessing content in the final build
app.get('/*', (req, res) => {
    if(process.env.NODE_ENV === 'production') {
        res.sendFile(path.join(__dirname, "../client/build", "index.html"), (err) => {
            if(err) {
                logger.warn("Incorrect path");
                res.status(500).send(err);
            }
        })
    } else {
        res.redirect('https://localhost:3000/')
    }
    
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
}) 