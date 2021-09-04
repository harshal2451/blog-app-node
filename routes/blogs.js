const express = require("express");
const blogRouter = express.Router();
const blogController = require('../controllers/blog.controller');
const { verifyUser } = require("../middleware/verify");

blogRouter.route("/").post(verifyUser,  blogController.createBlog);
blogRouter.route("/:id").get(verifyUser, blogController.getBlogs);
blogRouter.route("/detail/:id").get(verifyUser,   blogController.getBlogsDetail);
blogRouter.route("/:id").put(verifyUser,  blogController.updateBlogs);
blogRouter.route("/:id").delete(verifyUser,  blogController.deleteBlogs);

module.exports = blogRouter;