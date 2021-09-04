const express = require("express");
const overtimePolicyRouter = express.Router();
const overtimePolicyController = require("../controllers/overtimePolicy.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

overtimePolicyRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, overtimePolicyController.addOvertimePolicy);
overtimePolicyRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, overtimePolicyController.getOvertimePolicy);
overtimePolicyRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, overtimePolicyController.getOvertimePolicyDetail);
overtimePolicyRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, overtimePolicyController.updateOvertimePolicy);
overtimePolicyRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, overtimePolicyController.deleteOvertimePolicy);
overtimePolicyRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, overtimePolicyController.deleteMultipleOvertimePolicy);

module.exports = overtimePolicyRouter;