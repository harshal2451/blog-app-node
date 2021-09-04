const express = require("express");
const clientRouter = express.Router();
const clientController = require("../controllers/client.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

clientRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, clientController.addClient);
clientRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, clientController.getClient);
clientRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, clientController.getClientDetail);
clientRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, clientController.updateClient  );
clientRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, clientController.deleteClient);
clientRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, clientController.deleteMultipleClient);
clientRouter.route("/archive/:id").put(verifyUser,verifyValidUser,verifyRole, clientController.archiveClient);
clientRouter.route("/archive-client").get(verifyUser,verifyValidUser,verifyRole, clientController.clientArchiveList);
clientRouter.route("/restore/:id").put(verifyUser,verifyValidUser,verifyRole, clientController.restoreClient);

module.exports = clientRouter;
