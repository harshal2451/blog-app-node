const express = require("express");
const workTypeRouter = express.Router();
const workTypeController = require("../controllers/workType.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

workTypeRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, workTypeController.addWorkType);
workTypeRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, workTypeController.getWorkType);
workTypeRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, workTypeController.getWorkTypeDetail);
workTypeRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, workTypeController.updateWorkType);
workTypeRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, workTypeController.deleteWorkType);
workTypeRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, workTypeController.deleteMultipleWorkType);

module.exports = workTypeRouter;