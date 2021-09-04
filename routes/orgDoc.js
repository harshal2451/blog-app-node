const express = require("express");
const organisationDocumentsRouter = express.Router();
const organisationDocumentsController = require("../controllers/orgDoc.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

organisationDocumentsRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, organisationDocumentsController.addOrganisationDocuments);
organisationDocumentsRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, organisationDocumentsController.getOrganisationDocuments);
organisationDocumentsRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, organisationDocumentsController.getOrganisationDocumentsDetail);
organisationDocumentsRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, organisationDocumentsController.updateOrganisationDocuments);
organisationDocumentsRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, organisationDocumentsController.deleteOrganisationDocuments);
organisationDocumentsRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, organisationDocumentsController.deleteMultipleOrganisationDocuments);

module.exports = organisationDocumentsRouter;
