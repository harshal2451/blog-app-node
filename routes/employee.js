const express = require("express");
const employeeRouter = express.Router();
const employeeController = require("../controllers/employee2.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");
const { uploadFile } = require("../middleware/upload");


employeeRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, employeeController.addEmployee);
employeeRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, employeeController.getEmployee);
employeeRouter.route("/detail/:id").get(verifyUser, verifyValidUser, employeeController.getEmployeeDetail);
employeeRouter.route("/attendance/").get(verifyUser, verifyValidUser, verifyRole, employeeController.getAttendance);
employeeRouter.route("/filter").get(verifyUser, verifyValidUser, verifyRole, employeeController.filterEmployeeRole);
employeeRouter.route("/multiple-filter").post(verifyUser, verifyValidUser, verifyRole, employeeController.multipleFilterEmployeeRole);
employeeRouter.route("/employee-exist/").get(verifyUser, verifyValidUser, verifyRole, employeeController.checkEmployee);
employeeRouter.route("/emp-id").get(verifyUser, verifyValidUser, verifyRole, employeeController.getEmployeeId);
employeeRouter.route("/search_emp").get(verifyUser, verifyValidUser, verifyRole, employeeController.searchEmployee);
employeeRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, employeeController.updateEmployee);
employeeRouter.route("/bulk-update/").put(verifyUser, verifyValidUser, verifyRole, employeeController.addBulkUpdate);
employeeRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, employeeController.deleteEmployee);
employeeRouter.route("/create/excel/").post(verifyUser, verifyValidUser, verifyRole, uploadFile.single("file"), employeeController.uploadEmployee);
employeeRouter.route("/download/demo/").get(employeeController.downloadDemoFile);
employeeRouter.route("/search").get(verifyUser, verifyValidUser, employeeController.searchEmployee);
employeeRouter.route("/archive/:id").put(verifyUser,verifyValidUser,verifyRole, employeeController.employeeArchive);
employeeRouter.route("/archive-employee").get(verifyUser,verifyValidUser,verifyRole, employeeController.employeeArchiveList);
employeeRouter.route("/restore/:id").get(verifyUser,verifyValidUser,verifyRole, employeeController.employeeRestore);

module.exports = employeeRouter;
