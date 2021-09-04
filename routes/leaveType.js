const express = require("express");
const LeaveTypeRouter = express.Router();
const LeaveTypeController = require("../controllers/leaveType.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

LeaveTypeRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, LeaveTypeController.addLeaveType);
LeaveTypeRouter.route("/").get(verifyUser, verifyValidUser, LeaveTypeController.getLeaveType);
LeaveTypeRouter.route("/detail/:id").get(verifyUser, verifyValidUser, LeaveTypeController.getLeaveTypeDetail);
LeaveTypeRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, LeaveTypeController.updateLeaveType);
LeaveTypeRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, LeaveTypeController.deleteLeaveType);
LeaveTypeRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, LeaveTypeController.deleteMultipleLeaveType);

module.exports = LeaveTypeRouter;
