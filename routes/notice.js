const express = require("express");
const noticeRouter = express.Router();
const noticeController = require("../controllers/notice.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

noticeRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, noticeController.addNotice);
noticeRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, noticeController.getNotice);
noticeRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, noticeController.getNoticeDetail);
noticeRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, noticeController.updateNotice);
noticeRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, noticeController.deleteNotice);
noticeRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, noticeController.deleteMultipleNotice);

module.exports = noticeRouter;