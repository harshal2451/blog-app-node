const express = require("express");
const manualOTRouter = express.Router();
const manualOTController = require("../controllers/manualOvertime.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

manualOTRouter.route("/check-ot").post(verifyUser, verifyValidUser, manualOTController.checkOT);
manualOTRouter.route("/create").post(verifyUser, verifyValidUser, manualOTController.createOvertime);
manualOTRouter.route("/").post(verifyUser, verifyValidUser, manualOTController.getOTList);
manualOTRouter.route("/detail/:id").get(verifyUser, verifyValidUser, manualOTController.getOTDetails);
manualOTRouter.route("/ot-request").post(verifyUser, verifyValidUser, manualOTController.getOTListRequest);
manualOTRouter.route("/update/:id").put(verifyUser, verifyValidUser, manualOTController.updateOT);
manualOTRouter.route("/update-user/:id").put(verifyUser, verifyValidUser, manualOTController.updateFromUser);
manualOTRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, manualOTController.deleteOvertime);
manualOTRouter.route("/get-project").delete(verifyUser, verifyValidUser, manualOTController.getProjectFilter);

module.exports = manualOTRouter;