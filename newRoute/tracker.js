const express = require('express');
const trackerRouter = express.Router();
const trackerController = require('../controllers/newTracker.controller');
const projectController = require("../controllers/project.controller");
const offlineTrackerController = require('../controllers/v2OfflineTracking.controller')
const authController = require('../controllers/auth.controller');
const activityController = require('../controllers/activity.controller');
const settingController = require('../controllers/setting.controller')
const { verifyUser } = require('../middleware/verify')
const { verifyTokenUser } = require('../middleware/verifyToken')
const { verifyValidUser } = require("../middleware/verifyUser");

trackerRouter.route('/auth/login').post(authController.login);
trackerRouter.route('/tracker').post(verifyUser, verifyValidUser, verifyTokenUser, trackerController.startTracker);
trackerRouter.route('/tracker/tracker_status').post(verifyUser, verifyValidUser, verifyTokenUser, trackerController.getStatus)
trackerRouter.route('/tracker/first_memo').put(verifyUser,verifyValidUser, verifyTokenUser, trackerController.firstMemo )
trackerRouter.route('/tracker/restart_activity').put(verifyUser,verifyValidUser, verifyTokenUser, trackerController.addMemo )
trackerRouter.route('/screenshot/accept').post(verifyUser,verifyValidUser, verifyTokenUser, trackerController.acceptScreenshot)
trackerRouter.route('/screenshot/reject').post(verifyUser,verifyValidUser, verifyTokenUser, trackerController.rejectScreenshot)
trackerRouter.route('/tracker').put(verifyUser,verifyValidUser, verifyTokenUser, trackerController.stopTracker);
trackerRouter.route('/tracker/activity_log').post( verifyUser, verifyValidUser, activityController.getActivityLog);
trackerRouter.route('/tracker/activity_log/get_members').get( verifyUser, verifyValidUser, activityController.getMembers);
trackerRouter.route('/tracker/activity_log/get_projects').get( verifyUser, verifyValidUser, activityController.getProjects);
trackerRouter.route('/tracker/setting').put( verifyUser, verifyValidUser, settingController.changeSetting);
trackerRouter.route('/tracker/setting').get( verifyUser, verifyValidUser, settingController.getSetting);
trackerRouter.route('/tracker/tracking_offline').post(verifyUser, verifyTokenUser, verifyValidUser, offlineTrackerController.offlineTracker);
trackerRouter.route("/project/tracker/get_projects").get(verifyUser, verifyValidUser, verifyTokenUser, projectController.getProjectsByUserTracker);
trackerRouter.route('/tracker/search-desc').post( verifyUser,verifyValidUser, verifyTokenUser, trackerController.searchDescription);


module.exports = trackerRouter;