const express = require("express");
const organizationRouter = express.Router();
const organizationController = require("../controllers/organization.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

organizationRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, organizationController.createOrganization);

organizationRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, organizationController.getOrganizations);

organizationRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, organizationController.getOrganizationDetail);

organizationRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, organizationController.updateOrganization);

organizationRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, organizationController.deleteOrganization);

organizationRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, organizationController.deleteMultipleOrganization);

module.exports = organizationRouter;
