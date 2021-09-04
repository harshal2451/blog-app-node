const express = require("express");
const trackerPolicyRouter = express.Router();
const trackerPolicyController = require("../controllers/trackerProductivityPolicy.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

trackerPolicyRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, trackerPolicyController.addTrackerSetting);
trackerPolicyRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, trackerPolicyController.getTrackerSetting);
trackerPolicyRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, trackerPolicyController.getTrackerSettingDetail);
trackerPolicyRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, trackerPolicyController.updateTrackerSetting  );
trackerPolicyRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, trackerPolicyController.deleteTrackerSetting);
trackerPolicyRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, trackerPolicyController.deleteMultipleTrackerSetting);

module.exports = trackerPolicyRouter;