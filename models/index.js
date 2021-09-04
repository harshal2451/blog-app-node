"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const dotenv = require("dotenv");
dotenv.config();
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Roles = require("./role.model.js")(sequelize, Sequelize);
db.Users = require("./user.model.js")(sequelize, Sequelize);
db.Organisation = require("./organisation.model.js")(sequelize, Sequelize);
db.Setting = require("./setting.model.js")(sequelize, Sequelize);
db.Project = require("./project.model.js")(sequelize, Sequelize);
db.Activity = require("./activity.model.js")(sequelize, Sequelize);
db.Status = require("./status.model.js")(sequelize, Sequelize);
db.Screenshot = require("./screenshot.model.js")(sequelize, Sequelize);
db.ProjectMember = require("./project_member.model.js")(sequelize, Sequelize);
db.UORelation = require("./user_organisation_relation.model.js")(sequelize,Sequelize);
db.UToken = require("./user_token.model.js")(sequelize, Sequelize);
db.Department = require("./department.model.js")(sequelize, Sequelize);
db.DepartmentMember = require("./department_member.model.js")(sequelize, Sequelize);
db.Location = require("./location.model.js")(sequelize, Sequelize);
db.JobTitle = require("./jobtitle.model.js")(sequelize, Sequelize);
db.UserTitle = require("./user_jobtitle.model.js")(sequelize, Sequelize);
db.WorkType = require("./work_type.model.js")(sequelize, Sequelize);
db.UserLocation = require("./user_location.model.js")(sequelize, Sequelize);
db.UserWorkType = require("./user_worktype.model.js")(sequelize, Sequelize);
db.Memo = require("./memo.model.js")(sequelize, Sequelize);
db.EmployeeSeries = require("./employee_series.model.js")(sequelize, Sequelize);
db.TimeType = require("./time_type.model.js")(sequelize, Sequelize);
db.Leave = require("./leave.model.js")(sequelize, Sequelize);
db.Holiday = require("./holiday.model.js")(sequelize, Sequelize);
db.Shift = require("./shift.model.js")(sequelize, Sequelize);
db.BusinessUnit = require("./business_unit.model.js")(sequelize, Sequelize)
db.ProbationPolicy = require("./probation.model.js")(sequelize, Sequelize)
db.WeeklyOff = require("./weekly_off.model.js")(sequelize, Sequelize)
db.AttendanceTrackingPolicy = require("./attendance_tracking_policy.model.js")(sequelize, Sequelize)
db.AttendanceCapture = require("./attendance_capture_policy.model.js")(sequelize, Sequelize)
db.Employee = require("./employee.model.js")(sequelize, Sequelize)
db.UserReporting = require("./user_reporting.model.js")(sequelize, Sequelize)
db.Notice = require("./notice.model.js")(sequelize, Sequelize)
db.HolidayList = require("./holiday_list.model.js")(sequelize, Sequelize)
db.LeaveType = require("./leave_type.model.js")(sequelize, Sequelize) 
db.LeaveApply = require("./leave_apply.model.js")(sequelize, Sequelize)
db.LeaveApplyTo = require("./leave_apply_to.model.js")(sequelize, Sequelize)
db.OrgDoc = require('./org_doc.model.js')(sequelize, Sequelize)
db.JobDepartment = require('./job_department.model.js')(sequelize, Sequelize)
db.Overtime = require('./overtime.model.js')(sequelize, Sequelize)
db.EmployeeDocuments = require('./employee_doc.model.js')(sequelize, Sequelize)
db.TimerSetting = require('./timer_setting.model.js')(sequelize, Sequelize)
db.Milestones = require("./milestones.model.js")(sequelize, Sequelize)
db.TaskStatus = require("./task_status.model.js")(sequelize, Sequelize)
db.Task = require("./task.model.js")(sequelize, Sequelize)
db.TaskAssignee = require("./task_assignee.model.js")(sequelize, Sequelize)
db.TrackerPolicy = require("./tracker_policies.model.js")(sequelize, Sequelize)
db.OvertimePolicy = require("./overtime_policy.model.js")(sequelize, Sequelize)
db.LeaveDeductionPolicy = require("./leave_deduction_policy.model.js")(sequelize, Sequelize)

db.LeaveDeductionPolicy.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "org_leave_deduction_policy"
})

db.Employee.belongsTo(db.LeaveDeductionPolicy,{
  foreignKey: "leave_deduction_id",
  as: "emp_leave_deduction_policy"
})

db.TimerSetting.belongsTo(db.LeaveDeductionPolicy,{
  foreignKey: "leave_deduction_id",
  as: "default_leave_deduction_policy"
})

db.OvertimePolicy.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "org_overtime_policy"
})

db.Employee.belongsTo(db.OvertimePolicy,{
  foreignKey: "ot_policy_id",
  as: "emp_overtime_policy"
})

db.TimerSetting.belongsTo(db.OvertimePolicy,{
  foreignKey: "ot_policy_id",
  as: "default_overtime_policy"
})

db.TrackerPolicy.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "tracker_org"
})

db.Employee.belongsTo(db.TrackerPolicy,{
  foreignKey: "tracker_policy_id",
  as: "emp_tracker_policy"
})

db.TimerSetting.belongsTo(db.TrackerPolicy,{
  foreignKey: "tracker_policy_id",
  as: "default_tracker_policy"
})

db.Task.belongsTo(db.Milestones,{
  foreignKey: "milestone_id",
  as: "task_milestone"
})

db.Task.belongsTo(db.TaskStatus,{
  foreignKey: "task_status_id",
  as: "task_task_status"
})

db.TimerSetting.belongsTo(db.Location,{
  foreignKey: "location_id",
  as: "default_location"
});
 
db.TimerSetting.belongsTo(db.WorkType,{
  foreignKey: "work_type",
  as: "default_work_type"
});

db.TimerSetting.belongsTo(db.TimeType,{
  foreignKey: "time_type",
  as: "default_time_type"
});

db.TimerSetting.belongsTo(db.Shift,{
  foreignKey: "shift_id",
  as: "default_shift"
});

db.TimerSetting.belongsTo(db.HolidayList,{
  foreignKey: "holiday_id",
  as: "default_holiday"
});

db.TimerSetting.belongsTo(db.WeeklyOff,{
  foreignKey: "weekoff_id",
  as: "default_weekoff"
});

db.TimerSetting.belongsTo(db.Leave,{
  foreignKey: "leave_id",
  as: "default_leave"
});

db.TimerSetting.belongsTo(db.BusinessUnit,{
  foreignKey: "business_id",
  as: "default_business"
});

db.TimerSetting.belongsTo(db.ProbationPolicy,{
  foreignKey: "probation_id",
  as: "default_probation"
});

db.TimerSetting.belongsTo(db.AttendanceTrackingPolicy,{
  foreignKey: "attendance_tracking_id",
  as: "default_attendance_tracking"
});

db.TimerSetting.belongsTo(db.AttendanceCapture,{
  foreignKey: "attendance_capture_id",
  as: "default_attendance_capture"
});

db.TimerSetting.belongsTo(db.Notice,{
  foreignKey: "notice_id",
  as: "default_notice"
});

db.TimerSetting.belongsTo(db.EmployeeSeries,{
  foreignKey: "emp_series",
  as: "default_emp_series"
});

db.Task.hasMany(db.TaskAssignee,{
  foreignKey: "task_id",
  as: "task_task_assignee"
})

db.TaskAssignee.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "ta_org"
})

db.TaskAssignee.belongsTo(db.Users,{
  foreignKey: "user_id",
  as: "ta_users"
})

db.TaskAssignee.belongsTo(db.Task,{
  foreignKey: "task_id",
  as: "ta_task"
})

db.TaskStatus.belongsTo(db.Project,{
  foreignKey: "project_id",
  as: "task_prj"
})

db.TaskStatus.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "org_taskStatus"
})

db.Milestones.belongsTo(db.Project, {
  foreignKey: "project_id",
  as: "milestone_project"
})

db.Milestones.belongsTo(db.Organisation, {
  foreignKey: "organization_id",
  as: "org_milestones"
})

db.TimerSetting.belongsTo(db.Organisation, {
  foreignKey: "organization_id",
  as: "org_timesetting"
})

db.Users.hasMany(db.UserReporting,{
  foreignKey: "reporting_to",
  as: "user_reporting"
});

db.EmployeeDocuments.belongsTo(db.Employee,{
  foreignKey: "emp_id",
  as: "doc_emp"
});

db.EmployeeDocuments.belongsTo(db.OrgDoc,{
  foreignKey: "doc_id",
  as: "emp_doc_type"
});

db.EmployeeDocuments.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "emp_doc"
});

db.Overtime.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "overtime_org"
});

db.Overtime.belongsTo(db.Project,{
  foreignKey: "project_id",
  as: "overtime_project"
});

db.Overtime.belongsTo(db.Users,{
  foreignKey: "user_id",
  as: "overtime_user"
});

db.Overtime.belongsTo(db.Users,{
  foreignKey: "approve_by",
  as: "overtime_approve_user"
});

db.JobDepartment.belongsTo(db.Department,{
  foreignKey: "department_id",
  as: "job_department"
});

db.JobDepartment.belongsTo(db.JobTitle,{
  foreignKey: "job_id",
  as: "department_jobtitle"
});

db.JobTitle.hasMany(db.JobDepartment,{
  foreignKey: "job_id",
  as: "d_job"
});

db.JobTitle.hasMany(db.Employee,{
  foreignKey: "job_id",
  as: "emp_job"
});

db.JobDepartment.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "org_job_department"
});

db.OrgDoc.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "doc_org"
});

db.LeaveApply.belongsTo(db.Users,{
  foreignKey: "approve_by",
  as: "leave_approve_user"
});

db.LeaveApply.hasMany(db.LeaveApplyTo,{
  foreignKey: "leave_id",
  as: "leave_apply_to"
});

db.LeaveApplyTo.belongsTo(db.Users,{
  foreignKey: "apply_to",
  as: "leave_apply_user"
});

// db.LeaveApply.hasMany(db.Users,{
//   foreignKey: "leave_id",
//   as: "leave_apply_to_user"
// });

// db.LeaveApplyTo.belongsTo(db.LeaveApply,{
//   foreignKey: "leave_id",
//   as: "leave_apply_data"
// });

db.LeaveApplyTo.belongsTo(db.Users,{
  foreignKey: "user_id",
  as: "leave_user"
});

db.LeaveApplyTo.belongsTo(db.Employee,{
  foreignKey: "emp_id",
  as: "leave_emp"
});

db.LeaveApplyTo.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "leave_apply_to_org"
});

db.LeaveApply.belongsTo(db.Employee,{
  foreignKey: "emp_id",
  as: "leave_apply_emp"
});

db.LeaveApply.belongsTo(db.LeaveType,{
  foreignKey: "leave_type_id",
  as: "apply_leave_type"
});

db.LeaveType.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "leave_type_org"
});

db.LeaveApply.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "leave_apply_org"
});

db.HolidayList.hasMany(db.Holiday,{
  foreignKey: "holiday_id",
  as: "holiday_list"
});

db.Holiday.belongsTo(db.HolidayList,{
  foreignKey: "holiday_id",
  as: "org_holiday"
});

db.UserReporting.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "reporting_org"
});

db.UserReporting.belongsTo(db.Users,{
  foreignKey: "reporting_to",
  as: "reporting_user"
});

db.UserReporting.belongsTo(db.Employee,{
  foreignKey: "emp_id",
  as: "emp_report"
});

db.Employee.hasMany(db.UserReporting,{
  foreignKey: "emp_id",
  as: "reporting_emp_user"
});

db.Employee.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "emp_org"
});

db.Employee.belongsTo(db.Users,{
  foreignKey: "user_id",
  as: "emp_user"
});

db.Employee.belongsTo(db.EmployeeSeries,{
  foreignKey: "emp_series",
  as: "emp_series_detail"
});

db.Users.hasOne(db.Employee,{
  foreignKey: "user_id",
  as: "user_emp"
});

db.Employee.belongsTo(db.Department,{
  foreignKey: "department_id",
  as: "emp_department"
});

db.Employee.belongsTo(db.Location,{
  foreignKey: "location_id",
  as: "emp_location"
});

db.Employee.belongsTo(db.WorkType,{
  foreignKey: "work_type",
  as: "emp_work_type"
});

db.Employee.belongsTo(db.TimeType,{
  foreignKey: "time_type",
  as: "emp_time_type"
});

db.Employee.belongsTo(db.Shift,{
  foreignKey: "shift_id",
  as: "emp_shift"
});

db.Employee.belongsTo(db.HolidayList,{
  foreignKey: "holiday_id",
  as: "emp_holiday"
});

db.Employee.belongsTo(db.JobTitle,{
  foreignKey: "job_id",
  as: "emp_job"
});

db.Employee.belongsTo(db.WeeklyOff,{
  foreignKey: "weekoff_id",
  as: "emp_weekoff"
});

db.Employee.belongsTo(db.Leave,{
  foreignKey: "leave_id",
  as: "emp_leave"
});

db.Employee.belongsTo(db.BusinessUnit,{
  foreignKey: "business_id",
  as: "emp_business"
});

db.BusinessUnit.hasMany(db.Employee,{
  foreignKey: "business_id",
  as: "business_emp"
});

db.Employee.belongsTo(db.ProbationPolicy,{
  foreignKey: "probation_id",
  as: "emp_probation"
});

db.Employee.belongsTo(db.AttendanceTrackingPolicy,{
  foreignKey: "attendance_tracking_id",
  as: "emp_attendance_tracking"
});

db.Employee.belongsTo(db.AttendanceCapture,{
  foreignKey: "attendance_capture_id",
  as: "emp_attendance_capture"
});

db.AttendanceCapture.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "org_attendance_capture"
});

db.Employee.belongsTo(db.Notice,{
  foreignKey: "notice_id",
  as: "emp_notice"
});

db.Notice.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "org_notice"
});

db.AttendanceTrackingPolicy.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "org_attendance_tracking"
});

db.ProbationPolicy.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "org_probation",
});

db.Shift.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "org_shift",
});

db.HolidayList.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "org_holiday",
});

db.Leave.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "org_leave",
});

db.TimeType.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "time_org",
})

db.WeeklyOff.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "organization_weeklyoff",
});

db.BusinessUnit.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "organization_business",
});

db.EmployeeSeries.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "emp_organization",
});

db.Activity.belongsTo(db.Memo,{
  foreignKey: "memo_id",
  as: "activity_memo",
});

db.Memo.belongsTo(db.Users,{
  foreignKey: "user_id",
  as: "memo_user",
});

db.Memo.belongsTo(db.Project,{
  foreignKey: "project_id",
  as: "memo_project",
});

db.Memo.belongsTo(db.Status,{
  foreignKey: "status",
  as: "memo_status",
});

db.UserWorkType.belongsTo(db.Users,{
  foreignKey: "user_id",
  as: "user_work",
});

db.UserWorkType.belongsTo(db.WorkType,{
  foreignKey: "work_type",
  as: "work_user",
});

db.JobTitle.hasMany(db.UserTitle, {
  foreignKey: "job_id",
  as: "job_user",
});

db.UserLocation.belongsTo(db.Users,{
  foreignKey: "user_id",
  as: "user_location",
});

db.Users.hasMany(db.UserLocation,{
  foreignKey: "user_id",
  as: "u_location",
});

db.UserLocation.belongsTo(db.Location,{
  foreignKey: "location_id",
  as: "location_user",
});

db.WorkType.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "wt_organization",
});

db.DepartmentMember.belongsTo(db.Users,{
  foreignKey: "user_id",
  as: "user_department",
});

db.DepartmentMember.belongsTo(db.Department,{
  foreignKey: "department_id",
  as: "department",
});

db.UserTitle.belongsTo(db.Users,{
  foreignKey: "user_id",
  as: "user_title",
});

db.UserTitle.belongsTo(db.Organisation,{
  foreignKey: "organization_id",
  as: "user_title_organization",
});

db.Users.hasMany(db.UserTitle,{
  foreignKey: "user_id",
  as: "user_job",
});

db.UserTitle.belongsTo(db.JobTitle,{
  foreignKey: "job_id",
  as: "job_title",
});

db.JobTitle.belongsTo(db.Organisation, {
  foreignKey: "organization_id",
  as: "jOrganization",
});

db.Department.belongsTo(db.Organisation, {
  foreignKey: "organization_id",
  as: "dOrganization",
});

db.Location.belongsTo(db.Organisation, {
  foreignKey: "organization_id",
  as: "lOrganization",
});

db.Department.belongsTo(db.Users,{
  foreignKey: "head",
  as: "head_info",
});

db.UToken.belongsTo(db.Users, {
  foreignKey: "user_id",
  as: "tokens",
});

db.Users.hasMany(db.Organisation, {
  foreignKey: "user_id",
  as: "organizations",
  onDelete: "cascade",
});

db.Organisation.belongsTo(db.Users, {
  foreignKey: "user_id",
  as: "users",
  onDelete: "cascade",
});


db.Users.hasOne(db.Setting, {
  foreignKey: "user_id",
  as: "settings",
  onDelete: "cascade",
});

db.Project.belongsTo(db.Organisation, {
  foreignKey: "organization_id",
});

db.Project.hasMany(db.Status, {
  foreignKey: "project_id",
  as: "project_status",
  onDelete: "cascade",
});

db.Activity.belongsTo(db.Project, {
  foreignKey: "project_id",
  as: "projects",
});

db.Activity.belongsTo(db.Organisation, {
  foreignKey: "organization_id",
  as: "org_activity",
});

db.Project.hasMany(db.Activity, {
  foreignKey: "project_id",
  as: "activities",
  onDelete: "cascade",
});

db.Activity.belongsTo(db.Users, {
  foreignKey: "member_id",
  as: "user",
});

db.Users.hasMany(db.Activity, {
  foreignKey: "member_id",
  as: "activities",
  onDelete: "cascade",
});

db.Activity.hasMany(db.Screenshot, {
  foreignKey: "activity_id",
  as: "screenshots",
  onDelete: "cascade",
});

db.Setting.belongsTo(db.Users, {
  foreignKey: "user_id",
  as: "user",
});

db.ProjectMember.belongsTo(db.Users, {
  foreignKey: "user_id",
  as: "users",
});

db.ProjectMember.belongsTo(db.Project, {
  foreignKey: "project_id",
  as: "projects",
  onDelete: 'CASCADE'
});

db.Project.hasMany(db.ProjectMember, {
  foreignKey: "project_id",
  as: "teams",
  onDelete: "cascade",
});

db.ProjectMember.belongsTo(db.Roles, {
  foreignKey: "role",
});

db.UORelation.belongsTo(db.Users, {
  foreignKey: "user_id",
  as: "users",
  onDelete: "cascade",
});

db.Users.hasMany(db.UORelation, {
  foreignKey: "user_id",
  as: "organisation",
  onDelete: "cascade",
});

db.UORelation.belongsTo(db.Organisation, {
  foreignKey: "organization_id",
  as: "organizations",
  onDelete: "cascade",
});

db.UORelation.belongsTo(db.Roles, {
  foreignKey: "role",
  as: "roles",
});

module.exports = db;
