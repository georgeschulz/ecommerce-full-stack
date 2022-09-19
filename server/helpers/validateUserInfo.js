const { check, validationResult } = require('express-validator');
const logger = require('../logger');

//create a middleware to check user detail inputs to prevent dangerous or unclean user inputs from entering the database
const validateUserInfo = [
    check('firstName')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('First Name can not be empty')
        //bail means that it will stop looking for more issues and throw the error.
        .bail()
        .isLength({min: 1, max: 50})
        .withMessage('Please make sure your first and last name are no longer than 30 characters'),
    check('lastName')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Last Name can not be empty')
        .bail()
        .isLength({min: 1, max: 50})
        .withMessage('Please make sure that your first and last name are no longer than 30 characters'),
    check('phone')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Phone can not be empty')
        .bail()
        //regex that checks whether it's a phone number
        .matches(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/)
        .withMessage('Please enter a valid phone number'),
    check('email')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Email can not be empty')
        .bail()
        .isEmail()
        .withMessage('Please submit a valid email')
        //does things like removing white spaces and capitalization so emails are stored in db in a consitent format
        .normalizeEmail()
        .isLength({max: 62})
        .withMessage('Please Make sure you are only submitting one email. You can always add another one at a leter time!'),
    check('password')
        //checks for spaces in the password which could lead to weird whitespacing issues
        .custom(value => !/\s/.test(value))
        .withMessage('Please do not include any spaces in your password')
        .bail()
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Password can not be empty')
        .isLength({min: 7, max: 20})
        .withMessage('Please ensure that your password is between 7 and 20 characters'),
    check('address')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Please enter your address so we can check if you are in our service area!')
        .isLength({min: 5, max: 100})
        .withMessage('Please only enter one address in the address field'),
    check('city')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Please make sure you submit a city')
        //this is very important to keep up to date here because it affects scheduling and linking in db
        .isIn(['Alexandria', 'Springfield', 'Annandale', 'West Springfield', 'Reston', 'Herndon', 'Sterling', 'Fairfax', 'Reston', 'McClean', 'Clifton'])
        .withMessage('Please submit a city from the option list below. If you are not seeing a list of cities, please refresh the page or contact us at 111-111-2022'),
    check('state')
        .trim()
        .escape()
        .isIn(['VA', 'MD', 'DC'])
        .withMessage('Please enter a valid state that we service (either MD, DC or VA)'),
    check('zip')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Please include a zip code')
        .bail()
        .isLength({min: 1, max: 5})
        .withMessage('Please include a 5 digit zip code')
        .bail()
        .isNumeric()
        .withMessage('Please make sure you are submitting a valid 5 digit zip code. All zip codes should be 5 digits with no letters!'),
    check('squareFeet')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Please include the square footage of your home! It is necessary to calculate the price of our services')
        .bail()
        .isNumeric()
        .withMessage('Please make sure that you are only submitting the number of square feet of your home')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            logger.error('Input validation error: ', errors.errors)
            //send any errors back. These errors can be directly shown to the user
            res.status(422).json(errors.errors[0].msg)
        } else {
            next();
        }
        
    }
];

module.exports = validateUserInfo;