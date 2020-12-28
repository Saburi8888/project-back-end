// validating users.

const { check, validationResult } = require('express-validator');


// things to validate in signup

exports.validateSignupRequest = [
    
    check('firstName')
    .notEmpty()
    .withMessage('First Name is require'),
    check('lastName')
    .notEmpty()
    .withMessage('Last Name is require'),
    check('email')
    .isEmail()
    .withMessage('Valid email is require'),
    check('password')
    .isLength({ min:6 })
    .withMessage('Password must be at least 6 charactor long'),

];

// things to validate in signin

exports.validateSigninRequest = [
    
    check('email')
    .isEmail()
    .withMessage('Valid email is require'),
    check('password')
    .isLength({ min:6 })
    .withMessage('Invalid password'),

];

// signin & signup error check 

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0 ){
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next(); //sending validated request to controller auth(admin & user).
}