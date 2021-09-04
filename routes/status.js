const express = require("express");
const statusRouter = express.Router();
const statusController = require("../controllers/status.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyRole } = require("../middleware/verifyRole");
const { verifyValidUser } = require("../middleware/verifyUser");

statusRouter.route("/:id").get(verifyUser, verifyValidUser, statusController.getStatus);
statusRouter.route("/").post(verifyUser, verifyValidUser, verifyRole, statusController.createMultipleStatus);
statusRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, statusController.deleteStatus);

module.exports = statusRouter;
