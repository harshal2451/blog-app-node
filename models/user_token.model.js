module.exports = (sequelize, Sequelize) => {
    const UToken = sequelize.define(
      "users_token",
      {
        id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        user_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "users_user",
              key: "id",
            },
          },
        token : {
            type: Sequelize.STRING,
            allowNull: false
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
    return UToken;
  };
  