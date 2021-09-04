const express = require("express");
const weeklyOffRouter = express.Router();
const weeklyOffController = require("../controllers/weeklyOff.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

weeklyOffRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, weeklyOffController.addWeeklyOff);
weeklyOffRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, weeklyOffController.getWeeklyOff);
weeklyOffRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, weeklyOffController.getWeeklyOffDetail);
weeklyOffRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, weeklyOffController.updateWeeklyOff  );
weeklyOffRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, weeklyOffController.deleteWeeklyOff);
weeklyOffRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, weeklyOffController.deleteMultipleWeeklyOff);

module.exports = weeklyOffRouter;