const express = require("express");
const userReportingRouter = express.Router();
const userResportingController = require("../controllers/userReporting.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

userReportingRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, userResportingController.addUserReportingTo);
userReportingRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, userResportingController.getReportingUsers);
// userReportingRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, userResportingController.getWeeklyOffDetail);
userReportingRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, userResportingController.updateUserReportingTo  );
userReportingRouter.route("/delete/").post(verifyUser, verifyValidUser, userResportingController.deleteUserReportingTo);
// userReportingRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, userResportingController.deleteMultipleWeeklyOff);

module.exports = userReportingRouter;