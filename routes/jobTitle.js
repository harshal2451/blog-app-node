const express = require("express");
const jobRouter = express.Router();
const jobController = require("../controllers/jobTitle.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

jobRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, jobController.addJobTitle);
jobRouter.route("/create/department-job").post(verifyUser, verifyValidUser, verifyRole, jobController.addDepartmentJob);
jobRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, jobController.getJobTitle);
jobRouter.route("/:id").get(verifyUser, verifyValidUser, verifyRole, jobController.getJobTitleDepartment);
jobRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, jobController.getJobTitleDetail);
jobRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, jobController.updateJobTitle);
jobRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, jobController.deleteJobTitle);
jobRouter.route("/delete/department-job/:id").delete(verifyUser, verifyValidUser, verifyRole, jobController.deleteDepartmentJobTitle);
jobRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, jobController.deleteMultipleJobTitle);

module.exports = jobRouter;