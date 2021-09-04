module.exports = (sequelize, Sequelize) => {
    const LeaveReport = sequelize.define(
      "org_leave_apply",
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
        leave_type_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "org_leave_types",
              key: "id",
            },
        },
        leave_status: {
            type: Sequelize.BOOLEAN
        },
        emp_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "org_employee",
              key: "id",
            },
        },
        approve_by : {
          type: Sequelize.INTEGER,
          references: {
            model: 'users_user',
            key: 'id'
          }
        },
        start_slot : {
          type: Sequelize.STRING,
        },
        end_slot: {
          type: Sequelize.STRING,
        },
        days: {
            type: Sequelize.STRING,
        },
        start_date: {
            type: Sequelize.DATEONLY,
        },
        end_date: {
            type: Sequelize.DATEONLY,
        },
        note: {
            type: Sequelize.TEXT,
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue:true
        }
      },
      {
        timestamps : true,
        paranoid : true
      }
    );
    return LeaveReport;
  };
  
