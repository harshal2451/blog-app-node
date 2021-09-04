const express = require("express");
const LeaveReportingRouter = express.Router();
const LeaveReportingController = require("../controllers/leave_apply.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

LeaveReportingRouter.route("/create").post(verifyUser, verifyValidUser, LeaveReportingController.addLeaveReport);
LeaveReportingRouter.route("/create/leave-apply-to").post(verifyUser, verifyValidUser, LeaveReportingController.addLeaveApplyTo);
LeaveReportingRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, LeaveReportingController.getLeaveReport);
LeaveReportingRouter.route("/list").post(verifyUser, verifyValidUser, LeaveReportingController.getLeaveReportEmployee);
LeaveReportingRouter.route("/list/filter").post(verifyUser, verifyValidUser, LeaveReportingController.filterLeaveReportEmployee);
LeaveReportingRouter.route("/detail/:id").get(verifyUser, verifyValidUser, LeaveReportingController.getLeaveReportDetail);
LeaveReportingRouter.route("/leave-detail/:id").get(verifyUser, verifyValidUser, LeaveReportingController.getLeaveDetail);
LeaveReportingRouter.route("/update/:id").put(verifyUser, verifyValidUser, LeaveReportingController.updateLeaveReport);
LeaveReportingRouter.route("/status-update/:id").put(verifyUser, verifyValidUser, LeaveReportingController.updateLeaveStatus);
LeaveReportingRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, LeaveReportingController.deleteLeaveReport);
LeaveReportingRouter.route("/delete/leave-apply-to/:id").delete(verifyUser, verifyValidUser, LeaveReportingController.deleteLeaveApplyTo);
LeaveReportingRouter.route("/delete/").post(verifyUser, verifyValidUser, LeaveReportingController.deleteMultipleLeaveReport);
LeaveReportingRouter.route("/day-count").post(verifyUser, verifyValidUser, LeaveReportingController.getDayCount);
LeaveReportingRouter.route("/calender-data").get(verifyUser, verifyValidUser, LeaveReportingController.getLeaveCalenderData);
LeaveReportingRouter.route("/leave-request").post(verifyUser, verifyValidUser, LeaveReportingController.getLeaveRequests);
LeaveReportingRouter.route("/leave-request/filter").post(verifyUser, verifyValidUser, LeaveReportingController.filterLeaveRequests);

module.exports = LeaveReportingRouter;
