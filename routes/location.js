const express = require("express");
const locationRouter = express.Router();
const locationController = require("../controllers/location.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

locationRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, locationController.addLocation);
locationRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, locationController.getLocation);
locationRouter.route("/country").get(verifyUser, verifyValidUser, locationController.getCountry);
locationRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, locationController.getLocationDetail);
locationRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, locationController.updateLocation);
locationRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, locationController.deleteLocation);
locationRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, locationController.deleteMultipleLocation);

module.exports = locationRouter;