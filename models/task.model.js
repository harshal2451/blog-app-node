module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define(
      "org_task",
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
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "projects_project",
            key: "id"
          }
        },
        milestone_id: { 
          type: Sequelize.INTEGER,
          references:{
            model: "org_milestone",
            key: "id"
          }
        },
        task_status_id: { 
          type: Sequelize.INTEGER,
          references:{
            model: "org_task_status",
            key: "id"
          }
        },
        name: {
          type: Sequelize.STRING
        }, 
        description: {
          type: Sequelize.TEXT
        },
        due_date: {
          type: Sequelize.DATEONLY
        }
      },
      {
        freezeTableName: true,
        timestamps : true,
        paranoid : true
      }
    );
    return Task;
  };
  