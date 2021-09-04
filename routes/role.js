const express = require("express");
const roleRouter = express.Router();
const roleController = require("../controllers/role.controller");

roleRouter.route("/").get(roleController.getRoles);
roleRouter.route("/detail/:id").get(roleController.getRoleDetail);
roleRouter.route("/all").get(roleController.getAllRoles);
roleRouter.route("/create").post(roleController.createRoles);
roleRouter.route("/update/:id").put(roleController.updateRoles);
roleRouter.route("/delete/:id").delete(roleController.deleteRole);

module.exports = roleRouter;
