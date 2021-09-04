module.exports = (sequelize, Sequelize) => {
    const Milestones = sequelize.define( 
      "org_milestone",
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
            key: "id", 
          }, 
        },
        name : {
          type: Sequelize.STRING,
        },
        color_code: {
          type: Sequelize.STRING
        },
        description : {
            type: Sequelize.TEXT,
        },
        start_date : {
            type: Sequelize.DATEONLY
        },
        end_date : {
            type: Sequelize.DATEONLY
        }
      },
      {
        freezeTableName: true,
        timestamps : true,
        paranoid : true
      }
    );
    return Milestones;
  };
  