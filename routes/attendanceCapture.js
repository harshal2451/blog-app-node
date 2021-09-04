const express = require("express");
const attendanceCaptureRouter = express.Router();
const attendanceCaptureController = require("../controllers/attendanceCapture.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

attendanceCaptureRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, attendanceCaptureController.addAttendanceCapture);
attendanceCaptureRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, attendanceCaptureController.getAttendanceCapture);
attendanceCaptureRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, attendanceCaptureController.getAttendanceCaptureDetail);
attendanceCaptureRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, attendanceCaptureController.updateAttendanceCapture);
attendanceCaptureRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, attendanceCaptureController.deleteAttendanceCapture);
attendanceCaptureRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, attendanceCaptureController.deleteMultipleAttendanceCapture);

module.exports = attendanceCaptureRouter;