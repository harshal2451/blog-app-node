module.exports = (sequelize, Sequelize) => {
  const Screenshot = sequelize.define(
    "tracker_screenshot",
    {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      activity_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tracker_activity",
          key: "id",
        },
      },
      url: {
        type: Sequelize.STRING(1000),
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
  return Screenshot;
};
