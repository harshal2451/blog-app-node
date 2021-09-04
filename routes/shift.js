const express = require("express");
const shiftRouter = express.Router();
const shiftController = require("../controllers/shift.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

shiftRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, shiftController.addShift);
shiftRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, shiftController.getShift);
shiftRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, shiftController.getShiftDetail);
shiftRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, shiftController.updateShift);
shiftRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, shiftController.deleteShift);
shiftRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, shiftController.deleteMultipleShift);

module.exports = shiftRouter;