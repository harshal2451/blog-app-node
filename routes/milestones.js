const express = require("express");
const milestonesRouter = express.Router();
const milestonesController = require("../controllers/milestones.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

milestonesRouter.route("/create").post(verifyUser, verifyValidUser, milestonesController.addMilestones);
milestonesRouter.route("/").get(verifyUser, verifyValidUser, milestonesController.getMilestones);
milestonesRouter.route("/project-wise").get(verifyUser, verifyValidUser, milestonesController.getMilestonesProjectWise);
milestonesRouter.route("/detail/:id").get(verifyUser, verifyValidUser, milestonesController.getMilestonesDetail);
milestonesRouter.route("/update/:id").put(verifyUser, verifyValidUser, milestonesController.updateMilestones  );
milestonesRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, milestonesController.deleteMilestones);
milestonesRouter.route("/delete").post(verifyUser, verifyValidUser, milestonesController.deleteMultipleMilestones);

module.exports = milestonesRouter;