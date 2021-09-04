const express = require("express");
const taskAssigneeRouter = express.Router();
const taskAssigneeController = require("../controllers/taskAssignee.controller.js");
const { verifyUser } = require("../middleware/verify");
const { verifyRole } = require("../middleware/verifyRole");
const { verifyValidUser } = require("../middleware/verifyUser");

taskAssigneeRouter.route("/create").post(verifyUser, verifyValidUser, taskAssigneeController.addTaskAssignee);
taskAssigneeRouter.route("/search-assignee").get(verifyUser, verifyValidUser, taskAssigneeController.searchAssignee);
taskAssigneeRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, taskAssigneeController.deleteTaskAssignee);

module.exports = taskAssigneeRouter;