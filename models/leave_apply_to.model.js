module.exports = (sequelize, Sequelize) => {
    const LeaveApplyTo = sequelize.define(
      "org_leave_apply_to",
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
        leave_id : {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "org_leave_applies",
            key: "id",
          },
        },
        apply_to : {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "users_user",
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
        emp_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "org_employee",
              key: "id",
            },
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue:true
        },
      },
      {
        timestamps : true,
        paranoid : true
      }
    );
    return LeaveApplyTo;
  };
  