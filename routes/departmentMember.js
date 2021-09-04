const express = require("express");
const departmentMemberRouter = express.Router();
const departmentMemberController = require("../controllers/departmentMember.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

departmentMemberRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, departmentMemberController.addDepartmentMember);
departmentMemberRouter.route("/:id").get(verifyUser, verifyValidUser, verifyRole, departmentMemberController.getDepartmentMembers);
departmentMemberRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, departmentMemberController.getDepartmentMemberDetail);
departmentMemberRouter.route("/search/:id").get(verifyUser, verifyValidUser, verifyRole, departmentMemberController.searchDepartmentMembersAll);
departmentMemberRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, departmentMemberController.updateDepartmentMember);
departmentMemberRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, departmentMemberController.deleteDepartmentMember);
// departmentMemberRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, departmentMemberController.deleteMultipleDepartment);

module.exports = departmentMemberRouter;