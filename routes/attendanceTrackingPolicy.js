const express = require("express");
const attendanceTrackingPolicyRouter = express.Router();
const attendanceTrackingPolicyController = require("../controllers/attendanceTrackingPolicy.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

attendanceTrackingPolicyRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, attendanceTrackingPolicyController.addAttendanceTrackingPolicy);
attendanceTrackingPolicyRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, attendanceTrackingPolicyController.getAttendanceTrackingPolicy);
attendanceTrackingPolicyRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, attendanceTrackingPolicyController.getAttendanceTrackingPolicyDetail);
attendanceTrackingPolicyRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, attendanceTrackingPolicyController.updateAttendanceTrackingPolicy  );
attendanceTrackingPolicyRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, attendanceTrackingPolicyController.deleteAttendanceTrackingPolicy);
attendanceTrackingPolicyRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, attendanceTrackingPolicyController.deleteMultipleAttendanceTrackingPolicy);

module.exports = attendanceTrackingPolicyRouter;