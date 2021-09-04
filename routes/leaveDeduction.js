const express = require("express");
const leaveDeductionPolicyRouter = express.Router();
const leaveDeductionPolicyController = require("../controllers/leaveDeduction.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

leaveDeductionPolicyRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, leaveDeductionPolicyController.addLeaveDeduction);
leaveDeductionPolicyRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, leaveDeductionPolicyController.getLeaveDeduction);
leaveDeductionPolicyRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, leaveDeductionPolicyController.getLeaveDeductionDetail);
leaveDeductionPolicyRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, leaveDeductionPolicyController.updateLeaveDeductionPolicy);
leaveDeductionPolicyRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, leaveDeductionPolicyController.deleteLeaveDeductionPolicy);
leaveDeductionPolicyRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, leaveDeductionPolicyController.deleteMultipleLeaveDeductionPolicy);

module.exports = leaveDeductionPolicyRouter;