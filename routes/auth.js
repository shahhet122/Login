const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { signupvalidator, signinvalidator, emailValidator, verifyUserValidation, resetPasswordValidator, changePasswordValidator, updateProfileValidator } = require('../validators/auth');
const validate = require('../validators/validate');

const isAuth = require('../middlewares/isAuth');

router.post('/signup', signupvalidator, validate, authController.signup);
router.post('/signin', signinvalidator, validate, authController.signin);
router.post('/send-OTP', emailValidator, validate, authController.verifyCode);
router.post('/verify-user', verifyUserValidation, validate, authController.verifyUser);
router.post('/forgot-password', emailValidator, validate, authController.forgotPassword);
router.post('/reset-password', resetPasswordValidator, validate, authController.resetPassword);

router.put('/change-password', changePasswordValidator, validate, isAuth, authController.changePassword)
router.put('/update-profile', isAuth, updateProfileValidator, validate, authController.updateProfile)
module.exports = router;
