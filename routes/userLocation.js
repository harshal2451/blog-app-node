const express = require("express");
const userLocationRouter = express.Router();
const userLocationController = require("../controllers/locationMember.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

userLocationRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, userLocationController.addUserLocation);
userLocationRouter.route("/:id").get(verifyUser, verifyValidUser, verifyRole, userLocationController.getUserLocation);
userLocationRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, userLocationController.getUserLocationDetail);
userLocationRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, userLocationController.updateUserLocation);
userLocationRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, userLocationController.deleteUserLocation);
userLocationRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, userLocationController.deleteMultipleUserLocation);

module.exports = userLocationRouter;