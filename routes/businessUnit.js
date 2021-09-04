const express = require("express");
const businessUnitRouter = express.Router();
const businessUnitController = require("../controllers/businessUnit.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

businessUnitRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, businessUnitController.addBusinessUnit);
businessUnitRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, businessUnitController.getBusinessUnit);
businessUnitRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, businessUnitController.getBusinessUnitDetail);
businessUnitRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, businessUnitController.updateBusinessUnit  );
businessUnitRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, businessUnitController.deleteBusinessUnit);
businessUnitRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, businessUnitController.deleteMultipleBusinessUnit);

module.exports = businessUnitRouter;