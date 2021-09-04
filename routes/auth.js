const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controller');


authRouter.route('/login').post(authController.login);
authRouter.route('/signup').post(authController.signup);


module.exports = authRouter;