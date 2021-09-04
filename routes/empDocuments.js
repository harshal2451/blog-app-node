const express = require("express");
const employeeDocumentsRouter = express.Router();
const employeeDocumentsController = require("../controllers/empDocuments.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

employeeDocumentsRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, employeeDocumentsController.addEmployeeDocuments);
employeeDocumentsRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, employeeDocumentsController.getEmployeeDocumentss);
employeeDocumentsRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, employeeDocumentsController.getEmployeeDocumentsDetail);
employeeDocumentsRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, employeeDocumentsController.updateEmployeeDocuments);
employeeDocumentsRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, employeeDocumentsController.deleteEmployeeDocuments);
// employeeDocumentsRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, employeeDocumentsController.deleteMultipleDepartment);

module.exports = employeeDocumentsRouter;