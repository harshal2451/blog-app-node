const express = require("express");
const jobFillingRouter = express.Router();
const jobFillingController = require("../controllers/jobFilling.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

jobFillingRouter.route("/").get(verifyUser, verifyValidUser, verifyRole,  jobFillingController.getjobFilling);

module.exports = jobFillingRouter;