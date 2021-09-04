module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define(
      "org_employee",
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
        user_id : {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "users_user",
              key: "id",
            },
        },
        emp_id : {
            allowNull: false,
            type: Sequelize.STRING
        },
        emp_series:{
            type: Sequelize.INTEGER,
            references: {
              model: "employee_series",
              key: "id",
            },
        },
        f_name : {
            type: Sequelize.STRING 
        },
        m_name : {
            type: Sequelize.STRING 
        },
        l_name : {
            type: Sequelize.STRING 
        },
        gender : {
            type: Sequelize.STRING 
        },
        birth_date : {
            type: Sequelize.DATEONLY 
        },
        joining_date : {
            type: Sequelize.DATEONLY 
        },
        attendance_number : {
            type: Sequelize.INTEGER 
        },
        secondory_title : {
            type: Sequelize.STRING 
        },
        blood_group : {
            type: Sequelize.STRING,
        },
        benificary_code : {
            type: Sequelize.STRING,
        },
        salary : {
            type: Sequelize.INTEGER,
        },
        add1 : {
            type: Sequelize.STRING,
        },
        add2 : {
            type: Sequelize.STRING,
        },
        zip_code : {
            type: Sequelize.INTEGER,
        },
        city : {
            type: Sequelize.STRING,
        },
        state : {
            type: Sequelize.STRING,
        },
        country : {
            type: Sequelize.STRING,
        },
        tracker_version : {
            type: Sequelize.STRING,
        },
        department_id: {
            type: Sequelize.INTEGER,
            references: {
              model: "departments_department",
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
        job_id : {
            type: Sequelize.INTEGER,
            references: {
                model: "job_titles",
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
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue:true
        },
        deletedAt : {
            allowNull: true,
            type: Sequelize.DATE
            }
      },
      {
        freezeTableName: true,
        timestamps : true,
        paranoid : true
      }
    );
    return Employee;
  };
  