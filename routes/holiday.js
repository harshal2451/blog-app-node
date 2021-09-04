const express = require("express");
const holidayRouter = express.Router();
const holidayController = require("../controllers/holiday.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

holidayRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, holidayController.addHoliday);
holidayRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, holidayController.getHoliday);
holidayRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, holidayController.getHolidayDetail);
holidayRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, holidayController.updateHoliday);
holidayRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, holidayController.deleteHoliday);
holidayRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, holidayController.deleteMultipleHoliday);

module.exports = holidayRouter;