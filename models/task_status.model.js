module.exports = (sequelize, Sequelize) => {
    const TaskStatus = sequelize.define(
      "org_task_status",
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
            model: "projects_project",
            key: "id"
          }
        },
        name: {
          type: Sequelize.STRING
        }, 
        description: {
          type: Sequelize.TEXT        
        },
        colour_code: {
            type: Sequelize.STRING
        },
        review: {
            type: Sequelize.STRING
        }
      },
      {
        freezeTableName: true,
        timestamps : true,
        paranoid : true
      }
    );
    return TaskStatus;
  };
  