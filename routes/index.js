const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const blogRouter = require("./blogs");


router.use("/auth", authRouter);
router.use("/blogs", blogRouter);


module.exports = router;
