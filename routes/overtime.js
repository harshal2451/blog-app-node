const express = require("express");
const overtimeRouter = express.Router();
const overtimeController = require("../controllers/overtime.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

overtimeRouter.route("/fetch-ot").post(verifyUser, verifyValidUser, overtimeController.getUserOT);
overtimeRouter.route("/create").post(verifyUser, verifyValidUser, overtimeController.addOvertime);
overtimeRouter.route("/").post(verifyUser, verifyValidUser, overtimeController.getOvertime);
overtimeRouter.route("/detail/:id").get(verifyUser, verifyValidUser, overtimeController.getOvertimeDetail);
overtimeRouter.route("/update/:id").put(verifyUser, verifyValidUser, overtimeController.updateOverTime);
overtimeRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, overtimeController.deleteOvertime);
overtimeRouter.route("/delete").post(verifyUser, verifyValidUser, overtimeController.deleteMultipleOvertime);

module.exports = overtimeRouter;