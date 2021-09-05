const { Blogs } = require("../models");
const Sequelize = require("sequelize");
const response_messages = require("./response_messages/message");

const createBlog = async (request, response) => {
  try {
    const { blog_title, blog_description, blog_url } = request.body;
    const blog = await Blogs.create({
      blog_title,
      blog_description,
      blog_url
    })
    if (!blog) return response.status(400).send({ success: false, message: err.message })
    return response.status(200).send({ success: true, message: response_messages.b_created.success, response_data: blog })
  } catch (err) {
    return response.status(500).send({ success: false, message: err.message });
  }
};

const getBlogs = async (request, response) => {
  try {
    const getAllBlogs = await Blogs.findAll();
    return response
      .status(200)
      .send({
        success: true,
        message: response_messages.success,
        response_data: getAllBlogs,
      });
  } catch (err) {
    return response.status(500).send({ success: false, message: err.message });
  }
};

const getBlogsDetail = async (request, response) => {
  try {
    const { id } = request.params;
    const getBlockDetails = await Blogs.findOne({
      where: { id },
    });
    if (!getBlockDetails)
      return response
        .status(400)
        .send({ success: false, message: err.message });
    return response
      .status(200)
      .send({
        success: true,
        message: response_messages.success,
        response_data: getBlockDetails,
      });
  } catch (err) {
    return response.status(500).send({ success: false, message: err.message });
  }
};

const updateBlogs = async (request, response) => {
  try {
    const { id } = request.params;
    const { userId } = request;
    const { blog_title, blog_description } = request.body;

    const verifyBlogs = await Blogs.findOne({ where: { userId, id } });
    if (!verifyBlogs) {
      return response
        .status(400)
        .send({ success: false, message: response_messages.b_updateVerify });
    }

    let condition = {};
    if (blog_title) condition.blog_title = blog_title;
    if (blog_description) condition.blog_description = blog_description;
    const client = await Blogs.update(condition, {
      where: { id },
    });
    if (client[0] == 0)
      return response
        .status(400)
        .send({ success: false, message: err.message });
    return response
      .status(200)
      .send({
        success: true,
        message: response_messages.success,
      });
  } catch (err) {
    return response.status(500).send({ success: false, message: err.message });
  }
};

const deleteBlogs = async (request, response) => {
  try {
    const { userId } = request
    const { id } = request.params;
    if (!id) {
      return response
        .status(400)
        .send({ success: false, message: err.message });
    }
    const verifyBlogs = await Blogs.findOne({ where: { userId, id } });
    if (!verifyBlogs) {
      return response
        .status(400)
        .send({ success: false, message: response_messages.b_deleteVerify });
    }
    const blogs = await Blogs.destroy({
      where: { id },
    });
    if (blogs == 0)
      return response
        .status(400)
        .send({ success: false, message: err.message });

    return response
      .status(200)
      .send({
        success: true,
        message: response_messages.success,
      });
  } catch (err) {
    return response.status(500).send({ success: false, message: err.message });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogsDetail,
  updateBlogs,
  deleteBlogs,
};
