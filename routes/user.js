const express = require('express');
const userRouter = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyUser } = require('../middleware/verify')
const { verifyValidUser } = require('../middleware/verifyUser')


userRouter.route('/skip_onboard').get(verifyUser, verifyValidUser,  authController.skipOnBoard);
userRouter.route('/update/:id').put(verifyUser, verifyValidUser, authController.updateUser);
userRouter.route('/delete/:id').delete(verifyUser, verifyValidUser, authController.deleteUser);


module.exports = userRouter;