const express = require("express");
const newRouter = express.Router();
const trackerRouter = require("./tracker");


newRouter.use("/", trackerRouter);

module.exports = newRouter;