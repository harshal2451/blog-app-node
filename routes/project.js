const express = require("express");
const projectRouter = express.Router();
const projectController = require("../controllers/project.controller");
const projectMemberController = require("../controllers/projectMember.controller");
const { verifyUser } = require("../middleware/verify");
const { verifyTokenUser } = require("../middleware/verifyToken");
const { verifyRole } = require("../middleware/verifyRole");
const { verifyValidUser } = require("../middleware/verifyUser");

projectRouter.route("/").get(verifyUser, verifyValidUser, projectController.getProjects);
projectRouter
  .route("/get_project/:id")
  .get(verifyUser, verifyValidUser, projectController.getCurrentProject);
projectRouter
  .route("/bulk_create")
  .post(verifyUser, verifyValidUser, verifyRole, projectController.createMultipleProject);
projectRouter
  .route("/add_project_member")
  .post(verifyUser, verifyValidUser, verifyRole, projectMemberController.addProjectMember);
projectRouter
  .route("/add_member")
  .post(verifyUser, verifyValidUser, projectMemberController.addMember);
projectRouter
  .route("/get_project_member")
  .post(verifyUser, verifyValidUser, projectMemberController.getTeamMembers);
projectRouter
  .route("/update_project_member/:id")
  .put(verifyUser, verifyValidUser, projectMemberController.updateProjectMember);
projectRouter
  .route("/delete_project_member/:id")
  .delete(verifyUser, verifyValidUser, projectMemberController.deleteTeamMember);
projectRouter
  .route("/delete_project/:id")
  .delete(verifyUser,verifyValidUser, verifyRole, projectController.deleteProject);
projectRouter
  .route("/get_projects")
  .get(verifyUser, verifyValidUser, projectController.getProjectsByUser);
projectRouter
  .route("/tracker/get_projects")
  .get(verifyTokenUser, verifyValidUser, projectController.getProjectsByUserTracker);
  projectRouter
  .route("/search_project")
  .get(verifyUser, verifyTokenUser, verifyValidUser, projectController.searchProject);
projectRouter
  .route("/update_project/:id")
  .put(verifyUser, verifyValidUser, projectController.updateProject);
projectRouter
  .route("/update-status/:id")
  .put(verifyUser, verifyValidUser, projectController.updateProjectStatus);
projectRouter
  .route("/add_project")
  .post(verifyUser, verifyValidUser, verifyRole, projectController.addProjectWithMember);
projectRouter
  .route("/delete_projects")
  .post(verifyUser, verifyValidUser, verifyRole, projectController.deleteMultipleProjects);
projectRouter
  .route("/search")
  .get(verifyUser, verifyValidUser, projectController.searchProject);
  projectRouter
  .route("/project-exist")
  .get(verifyUser, verifyValidUser, projectController.checkProject);

module.exports = projectRouter;
