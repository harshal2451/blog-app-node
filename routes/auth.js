const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyUser } = require('../middleware/verify')
const { verifyValidUser } = require('../middleware/verifyUser')


authRouter.route('/login').post(authController.login);
authRouter.route('/signup').post(authController.signup);
authRouter.route('/verify_otp').post(authController.verifyOtp);
authRouter.route('/resend-otp').post(authController.resendOtp);
authRouter.route('/forgot_pass').post(authController.forgotPassword);
authRouter.route('/update_pass').post(verifyUser, verifyValidUser, authController.updateNewPassword);
authRouter.route('/change_pass').post(verifyUser, verifyValidUser, authController.changePassword);
authRouter.route('/resend-invitation').post(verifyUser, verifyValidUser, authController.resendInvitation);
authRouter.route('/cancel-invitation/:id').post(verifyUser, verifyValidUser, authController.cancelInvitation);


module.exports = authRouter;