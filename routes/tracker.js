const express = require('express');
const trackerRouter = express.Router();
const trackerController = require('../controllers/tracker.controller');
const offlineTrackerController = require('../controllers/newOfflineTracker.controller')
const activityController = require('../controllers/activity.controller');
const manualActivityController = require('../controllers/manualActivity.controller');
const settingController = require('../controllers/setting.controller')
const timerSettingController = require('../controllers/timerSetting.controller')
const { verifyUser } = require('../middleware/verify')
const { verifyTokenUser } = require('../middleware/verifyToken')
const { verifyValidUser } = require("../middleware/verifyUser");
const { verifyRole } = require("../middleware/verifyRole");


trackerRouter.route('/tracker').post( verifyTokenUser, verifyValidUser, trackerController.startTracker);
trackerRouter.route('/tracker/tracker_status').post(verifyTokenUser, verifyValidUser, trackerController.getStatus)
trackerRouter.route('/tracker/first_memo').put( verifyTokenUser, verifyValidUser, trackerController.firstMemo )
trackerRouter.route('/tracker/memo').put( verifyTokenUser, verifyValidUser, trackerController.addMemo )
trackerRouter.route('/screenshot/accept').post( verifyTokenUser, verifyValidUser, trackerController.acceptScreenshot)
trackerRouter.route('/screenshot/reject').post( verifyTokenUser, verifyValidUser, trackerController.rejectScreenshot)
trackerRouter.route('/tracker').put( verifyTokenUser, verifyValidUser, trackerController.stopTracker);
trackerRouter.route('/tracker/activity_log').post( verifyUser, verifyValidUser, activityController.getActivityLog);
trackerRouter.route('/tracker/activity_log/timesheet').post( verifyUser, verifyValidUser, activityController.getTimesheet);
trackerRouter.route('/tracker/activity_log/get_members').get( verifyUser, verifyValidUser, activityController.getMembers);
trackerRouter.route('/tracker/activity_log/get_projects').get( verifyUser, verifyValidUser, activityController.getProjects);
trackerRouter.route('/tracker/setting').put( verifyUser, verifyValidUser, settingController.changeSetting);
trackerRouter.route('/tracker/setting').get( verifyUser, verifyValidUser, settingController.getSetting);
trackerRouter.route('/tracker/timer-setting').put( verifyUser, verifyValidUser, timerSettingController.changeSetting);
trackerRouter.route('/tracker/timer-setting/update').put( verifyUser, verifyValidUser, verifyRole, timerSettingController.updateDefaultPolicy);
trackerRouter.route('/tracker/timer-setting').get( verifyUser, verifyValidUser, timerSettingController.getDefaultSetting);
trackerRouter.route('/tracker/tracking_offline').post( verifyTokenUser, verifyValidUser, offlineTrackerController.offlineTracker);
trackerRouter.route("/tracker/timesheet-search").post(verifyUser, verifyValidUser, activityController.timesheetSearch);

trackerRouter.route("/manual-entry/check").post(verifyUser, verifyValidUser, verifyRole,  manualActivityController.checkManualActivity);
trackerRouter.route("/manual-entry/create").post(verifyUser, verifyValidUser,  verifyRole, manualActivityController.createManual);
trackerRouter.route("/manual-entry/").post(verifyUser, verifyValidUser,  verifyRole,  manualActivityController.getManualList);
trackerRouter.route("/manual-entry/detail/:id").get(verifyUser, verifyValidUser,  verifyRole,  manualActivityController.getManualDetails);
trackerRouter.route("/manual-entry/update/:id").put(verifyUser, verifyValidUser,  verifyRole, manualActivityController.updateManual);
trackerRouter.route("/manual-entry/delete/:id").delete(verifyUser, verifyValidUser, verifyRole,  manualActivityController.deleteManual);
trackerRouter.route("/manual-entry/user-project/:id").get(verifyUser, verifyValidUser,  manualActivityController.getUsersProject);

module.exports = trackerRouter;
