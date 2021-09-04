
module.exports = (sequelize, Sequelize) => {
    const Overtime = sequelize.define(
      "employee_overtime",
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
        project_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'projects_project',
            key: 'id'
          }
        },
        user_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: 'users_user',
              key: 'id'
            }
        },
        date : {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        time : {
            type: Sequelize.STRING,
             allowNull: false
        },
        overtime_status: {
            type: Sequelize.BOOLEAN,
        },
        reason: {
          type: Sequelize.TEXT,
        },
        approve_by : {
            type: Sequelize.INTEGER,
            references: {
              model: 'users_user',
              key: 'id'
            }
        },
      },
      {
        timestamps : true,
        paranoid : true
      }
    );
    return Overtime;
  };
  