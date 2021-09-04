const express = require("express");
const taskStatusRouter = express.Router();
const taskStatusController = require("../controllers/taskStatus.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

taskStatusRouter.route("/create").post(verifyUser, verifyValidUser, taskStatusController.addtaskStatus);
taskStatusRouter.route("/").get(verifyUser, verifyValidUser, taskStatusController.gettaskStatus);
taskStatusRouter.route("/project/:id").get(verifyUser, verifyValidUser, taskStatusController.gettaskStatusProjectWise);
taskStatusRouter.route("/detail/:id").get(verifyUser, verifyValidUser, taskStatusController.gettaskStatusDetail);
taskStatusRouter.route("/update/:id").put(verifyUser, verifyValidUser, taskStatusController.updateTaskStatus);
taskStatusRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, taskStatusController.deletetaskStatus);
//taskStatusRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, taskStatusController.deleteMultipletaskStatus);

module.exports = taskStatusRouter;