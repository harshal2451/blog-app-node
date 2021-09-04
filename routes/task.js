const express = require("express");
const taskRouter = express.Router();
const taskController = require("../controllers/task.controller.js");
const { verifyUser } = require("../middleware/verify");
const { verifyRole } = require("../middleware/verifyRole");
const { verifyValidUser } = require("../middleware/verifyUser");

taskRouter.route("/create").post(verifyUser, verifyValidUser, taskController.addTask);
taskRouter.route("/create-with-assignee").post(verifyUser, verifyValidUser, taskController.addTaskWithAssignee);
taskRouter.route("/").get(verifyUser, verifyValidUser, taskController.getTask);
taskRouter.route("/detail/:id").get(verifyUser, verifyValidUser, taskController.getTaskDetail);
taskRouter.route("/update/:id").put(verifyUser, verifyValidUser, taskController.updateTask  );
taskRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, taskController.deleteTask);
taskRouter.route("/delete").post(verifyUser, verifyValidUser, taskController.deleteMultipleTask);

module.exports = taskRouter;