module.exports = (sequelize, Sequelize) => {
  const Status = sequelize.define(
    "tracker_status",
    {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      project_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'projects_project',
          key: 'id'
        }
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
  return Status;
};
