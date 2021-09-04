module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define(
    "projects_project",
    {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      organization_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "organizations_organization",
          key: "id",
        },
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
  return Project;
};
