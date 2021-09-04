const express = require('express');
const memberRouter = express.Router();
const memberController = require('../controllers/member.controller');
const { verifyUser } = require('../middleware/verify')
const { verifyRole } = require("../middleware/verifyRole");
const { verifyValidUser } = require("../middleware/verifyUser");

memberRouter.route('/get-member/:id').get(verifyUser, verifyValidUser ,memberController.getMemberDetail);
memberRouter.route('/add-member').post(verifyUser, verifyValidUser, verifyRole, memberController.addMember);
memberRouter.route('/update-member/:id').put(verifyUser, verifyValidUser, memberController.updateMember);
memberRouter.route('/delete-member/:id').delete(verifyUser, verifyValidUser, verifyRole, memberController.deleteMember);
memberRouter.route('/get-members/:id').get(verifyUser,verifyValidUser, memberController.searchMembers);
memberRouter.route('/').get(verifyUser, verifyValidUser, memberController.getMembers);
memberRouter.route('/all').get(verifyUser,verifyValidUser, memberController.getMembersAll);
memberRouter.route('/search/all').get(verifyUser,verifyValidUser, memberController.searchMembersAll);
memberRouter.route('/assign-member').post(verifyUser, verifyValidUser, memberController.assignMember);
memberRouter.route('/remove-member').post(verifyUser, verifyValidUser, memberController.removeAssignee);
memberRouter.route("/delete-members").post(verifyUser, verifyValidUser, verifyRole, memberController.deleteMultipleTeamMembers);

module.exports = memberRouter;