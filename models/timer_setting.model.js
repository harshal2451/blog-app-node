module.exports = (sequelize, Sequelize) => {
    const TimerSetting = sequelize.define(
      "org_timer_setting",
      {
        id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        organization_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "organizations_organization",
            key: "id",
          },
        },
        start_min: {
          type: Sequelize.INTEGER,
          defaultValue: 5, //minute
        },
        end_min: {
          type: Sequelize.INTEGER,
          defaultValue: 10, //minute
        },
        min_productivity_all: {
          type: Sequelize.INTEGER,
          defaultValue: 60
        },
        min_productivity_activity: {
          type: Sequelize.INTEGER,
          defaultValue: 10
        },
        avg_keyboard_click:  {
          type: Sequelize.INTEGER,
          defaultValue: 60
        },
        avg_mouse_click:  {
          type: Sequelize.INTEGER,
          defaultValue: 60
        },
        keyboard_percentage:  {
          type: Sequelize.INTEGER,
          defaultValue: 50
        },
        mouse_percentage:  {
          type: Sequelize.INTEGER,
          defaultValue: 50
        },
        min_mouse_count: {
          type: Sequelize.INTEGER,
          defaultValue: 5
        },
        min_keyboard_count: {
          type: Sequelize.INTEGER,
          defaultValue: 15  
        },
        count_keyboard_hit: {
          type: Sequelize.BOOLEAN,
          defaultValue: true, 
        },
        count_mouse_hit: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        date_format: {
            type: Sequelize.STRING,
            defaultValue:'DD-MM-YYYY'
        },
        emp_series:{
          type: Sequelize.INTEGER,
          references: {
            model: "employee_series",
            key: "id",
          },
        },
        location_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "locations_location",
            key: "id",
          },
        },
        notice_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "org_notice_policy",
                key: "id",
            }
        },
        work_type : {
            type: Sequelize.INTEGER,
            references: {
                model: "work_type",
                key: "id",
            }
        },
        time_type : {
            type: Sequelize.INTEGER,
            references: {
                model: "time_type",
                key: "id",
            }
        },
        shift_id : {
            type: Sequelize.INTEGER,
            references: {
                model: "org_shift",
                key: "id",
            }
        },
        holiday_id : {
            type: Sequelize.INTEGER,
            references: {
                model: "org_holiday_list",
                key: "id",
            }
        },
        weekoff_id : {
            type: Sequelize.INTEGER,
            references: {
                model: "org_weekly_off",
                key: "id",
            }
        },
        leave_id : {
            type: Sequelize.INTEGER,
            references: {
                model: "org_leave_plan",
                key: "id",
            }
        },
        business_id : {
            type: Sequelize.INTEGER,
            references: {
                model: "business_unit",
                key: "id",
            }
        },
        attendance_capture_id : {
            type: Sequelize.INTEGER,
            references: {
                model: "org_attendance_capture_policy",
                key: "id",
            }
        },
        attendance_tracking_id : {
            type: Sequelize.INTEGER,
            references: {
                model: "org_attendance_tracking_policy",
                key: "id",
            }
        },
        probation_id : {
            type: Sequelize.INTEGER,
            references: {
                model: "org_probation_policy",
                key: "id",
            }
        },
        tracker_policy_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "org_tracker_policy",
            key: "id", 
          }
        },
        ot_policy_id: {
          type: Sequelize.INTEGER,
          references: {
          model: "org_overtime_policy",
          key: "id", 
          }
        },
        leave_deduction_id: {
          type: Sequelize.INTEGER,
          references: {
          model: "org_leave_deduction_policy",
          key: "id", 
          }
        }
      },
      {
        freezeTableName: true,
        timestamps : true,
        paranoid : true
      }
    );
    return TimerSetting;
  };
  