const session = require('express-session'); //creates a session

const conObject = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASEPASSWORD,
    port: process.env.DATABASEPORT,
    ssl: true
}

const store = new (require('connect-pg-simple')(session))({
    conObject
})

module.exports = store;