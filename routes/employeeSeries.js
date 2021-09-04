const express = require("express");
const employeeSeriesRouter = express.Router();
const employeeSeriesController = require("../controllers/employeeSeries.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

employeeSeriesRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, employeeSeriesController.addEmployeeSeries);
employeeSeriesRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, employeeSeriesController.getEmployeeSeries);
employeeSeriesRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, employeeSeriesController.getEmployeeSeriesDetail);
employeeSeriesRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, employeeSeriesController.updateEmployeeSeries);
employeeSeriesRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, employeeSeriesController.deleteEmployeeSeries);
employeeSeriesRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, employeeSeriesController.deleteMultipleEmployeeSeries);

module.exports = employeeSeriesRouter;