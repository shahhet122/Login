const expressValidator = require('express-validator');
const validateEmail = require('./validateEmail');
const check = expressValidator.check;
const signupvalidator = [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Email invalid').notEmpty().withMessage('Email is required'),
    check('password').notEmpty().withMessage('Password is required'),
];

const signinvalidator = [
    check('email').isEmail().withMessage('Email invalid').notEmpty().withMessage('Email is required'),
    check('password').notEmpty().withMessage('Password is required'),
];

const emailValidator = [
    check('email').isEmail().withMessage('Email invalid').notEmpty().withMessage('Email is required'),
];

const verifyUserValidation = [
    check('email').isEmail().withMessage('Email invalid').notEmpty().withMessage('Email is required'),
    check('code').notEmpty().withMessage('Code is required'),
]

const resetPasswordValidator = [
    check('email').isEmail().withMessage('Email invalid').notEmpty().withMessage('Email is required'),
    check('password').notEmpty().withMessage('Password is required'),
    check('code').notEmpty().withMessage('Code is required'),
]

const changePasswordValidator = [
    check('oldPassword').notEmpty().withMessage('Old password is required'),
    check('newPassword').notEmpty().withMessage('New password is required'),
];

const updateProfileValidator = [
    check('email').custom(async (email) => {
        if (email) {
            const isValidEmail = validateEmail(email);
            if (!isValidEmail) {
                throw new Error('Invalid email');
            }
        }
    }
    )
]
module.exports = { signupvalidator, signinvalidator, emailValidator, verifyUserValidation, resetPasswordValidator, changePasswordValidator, updateProfileValidator };