const express = require("express");
const attendanceRouter = express.Router();
const attendanceController = require("../controllers/attendance.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

attendanceRouter.route("/get-attendance").post(verifyUser, verifyValidUser, attendanceController.getAttendance);
attendanceRouter.route("/search-attendance").post(verifyUser, verifyValidUser, attendanceController.searchAttendance);
attendanceRouter.route("/get-department-member").post(verifyUser, verifyValidUser, attendanceController.getDepartmentMember);
// attendanceRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, attendanceController.getAttendanceCapture);
// attendanceRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, attendanceController.getAttendanceCaptureDetail);
// attendanceRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, attendanceController.updateAttendanceCapture);
// attendanceRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, attendanceController.deleteAttendanceCapture);
// attendanceRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, attendanceController.deleteMultipleAttendanceCapture);

module.exports = attendanceRouter;