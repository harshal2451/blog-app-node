module.exports = (sequelize, Sequelize) => {
    const TaskAssignee = sequelize.define(
      "org_task_assignee",
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
        user_id: {
          type: Sequelize.INTEGER, 
          references: {
            model: "users_user",
            key: "id"
        }
        }, 
        task_id: {
          type: Sequelize.INTEGER,
          references: {
              model: "org_task",
              key: "id"
          }         
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
      },
      {
        freezeTableName: true,
        timestamps : true,
        paranoid : true
      }
    );
    return TaskAssignee;
  };
  