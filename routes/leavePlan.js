const express = require("express");
const leaveRouter = express.Router();
const leaveController = require("../controllers/leavePlan.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

leaveRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, leaveController.addLeavePlan);
leaveRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, leaveController.getLeavePlan);
leaveRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, leaveController.getLeaveDetail);
leaveRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, leaveController.updateLeavePlan);
leaveRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, leaveController.deleteLeavePlan);
leaveRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, leaveController.deleteMultipleLeavePlan);

module.exports = leaveRouter;