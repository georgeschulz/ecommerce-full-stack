const { check, validationResult } = require('express-validator');

//create a middleware to check user detail inputs to prevent dangerous or unclean user inputs from entering the database
const validateUserLogin = [
    check('username')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Email can not be empty')
        .bail()
        .isEmail()
        .withMessage('Please submit a valid email as your username!')
        .normalizeEmail()
        .isLength({ max: 62 })
        .withMessage('Please Make sure you are only submitting one email. You can always add another one at a leter time!'),
    check('password')
        .custom(value => !/\s/.test(value))
        .withMessage('Please do not include any spaces in your password')
        .bail()
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Password can not be empty')
        .isLength({ min: 7, max: 20 })
        .withMessage('Please ensure that your password is between 7 and 20 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Input validation error for user:", errors)
            res.status(422).json(errors.errors[0].msg)
        } else {
            next();
        }

    }
];

module.exports = validateUserLogin;