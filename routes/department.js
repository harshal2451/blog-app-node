const express = require("express");
const departmentRouter = express.Router();
const departmentController = require("../controllers/department.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

departmentRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, departmentController.addDepartment);
departmentRouter.route("/").get(verifyUser, verifyValidUser, departmentController.getDepartment);
departmentRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, departmentController.getDepartmentDetail);
departmentRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, departmentController.updateDepartment);
departmentRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, departmentController.deleteDepartment);
departmentRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, departmentController.deleteMultipleDepartment);

module.exports = departmentRouter; 