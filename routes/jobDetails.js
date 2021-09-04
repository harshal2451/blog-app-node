const express = require("express");
const jobDetailsRouter = express.Router();
const jobDetailsController = require("../controllers/jobDetails.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

jobDetailsRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, jobDetailsController.getjobDetails);

module.exports = jobDetailsRouter;