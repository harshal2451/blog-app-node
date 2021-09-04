const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const memberRouter = require("./member");
const projectRouter = require("./project");
const trackerRouter = require("./tracker");
const userRouter = require("./user");
const statusRouter = require("./status");
const roleRouter = require("./role");
const organizationRouter = require("./organization");
const departmentRouter = require("./department");
const locationRouter = require("./location");
const jobRouter = require("./jobTitle");
const departmentMemberRouter = require("./departmentMember");
const workTypeRouter = require("./workType");
const userLocationRouter = require("./userLocation");
const employeeSeriesRouter = require("./employeeSeries");
const leaveRouter = require("./leavePlan");
const businessUnitRouter = require("./businessUnit");
const shiftRouter = require("./shift");
const probationRouter = require("./probation");
const weeklyOffRouter = require("./weeklyOff");
const attendanceTrackingPolicyRouter = require("./attendanceTrackingPolicy");
const attendanceCaptureRouter = require("./attendanceCapture");
const employeeRouter = require("./employee");
const noticeRouter = require("./notice");
const jobDetailsRouter = require("./jobDetails")
const jobFillingRouter = require("./jobFilling")
const holidayeRouter = require("./holiday");
const attendanceRouter = require("./attendance");
const LeaveApplyRouter = require("./leaveApply");
const LeaveTypeRouter = require("./leaveType");
const OrganisationDocuments = require("./orgDoc");
const overtimeRouter = require("./overtime");
const employeeDocumentsRouter = require("./empDoc");
const userReportingRouter = require("./userReporting");
const milestonesRouter = require("./milestones");
const taskStatusRouter = require("./taskStatus");
const taskRouter = require("./task");
const taskAssigneeRouter = require("./taskAssignee");
const trackerPolicyRouter = require("./trackerPolicy");
const manualOTRouter = require("./manualOvertime")
const overtimePolicyRouter = require("./overtimePolicy")
const leaveDeductionPolicyRouter = require("./leaveDeduction")
const clientRouter = require("./client")

router.use("/auth", authRouter);
router.use("/member", memberRouter);
router.use("/project", projectRouter); 
router.use("/", trackerRouter);
router.use("/user", userRouter);
router.use("/status", statusRouter);
router.use("/role", roleRouter);
router.use("/organization", organizationRouter);
router.use("/department", departmentRouter);
router.use("/location", locationRouter);
router.use("/job-title", jobRouter);
router.use("/department-member", departmentMemberRouter);
router.use("/work-type", workTypeRouter);
router.use("/user-location", userLocationRouter);
router.use("/employee-series", employeeSeriesRouter);
router.use("/leave-plan", leaveRouter);
router.use("/business-unit", businessUnitRouter)
router.use("/shift", shiftRouter)
router.use("/probation", probationRouter)
router.use("/weekly-off", weeklyOffRouter)
router.use("/attendance-tracking-policy", attendanceTrackingPolicyRouter)
router.use("/attendance-capture-policy", attendanceCaptureRouter)
router.use("/employee", employeeRouter)
router.use("/notice", noticeRouter)
router.use("/job-details", jobDetailsRouter)
router.use("/job-filling", jobFillingRouter)
router.use("/holiday", holidayeRouter)
router.use("/attendance", attendanceRouter)
router.use("/leave-apply", LeaveApplyRouter)
router.use("/leave-type", LeaveTypeRouter)
router.use("/org-docs", OrganisationDocuments)
router.use("/overtime", overtimeRouter)
router.use("/emp-docs", employeeDocumentsRouter)
router.use("/user-reporting", userReportingRouter)
router.use("/milestones", milestonesRouter)
router.use("/taskStatus", taskStatusRouter)
router.use("/task", taskRouter)
router.use("/task-assignee", taskAssigneeRouter)
router.use("/tracker-policy", trackerPolicyRouter)
router.use("/manual-ot", manualOTRouter)
router.use("/overtime-policy", overtimePolicyRouter)
router.use("/leave-deduction-policy", leaveDeductionPolicyRouter)
router.use("/client", clientRouter)

module.exports = router;
