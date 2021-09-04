const express = require("express");
const probationRouter = express.Router();
const probationController = require("../controllers/probation.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");

probationRouter.route("/create").post(verifyUser, verifyValidUser, verifyRole, probationController.addProbation);
probationRouter.route("/").get(verifyUser, verifyValidUser, verifyRole, probationController.getProbation);
probationRouter.route("/detail/:id").get(verifyUser, verifyValidUser, verifyRole, probationController.getProbationDetail);
probationRouter.route("/update/:id").put(verifyUser, verifyValidUser, verifyRole, probationController.updateProbation);
probationRouter.route("/delete/:id").delete(verifyUser, verifyValidUser, verifyRole, probationController.deleteProbation);
probationRouter.route("/delete").post(verifyUser, verifyValidUser, verifyRole, probationController.deleteMultipleProbation);

module.exports = probationRouter;