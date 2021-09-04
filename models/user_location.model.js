module.exports = (sequelize, Sequelize) => {
    const UserLocation = sequelize.define(
      "users_location",
      {
        id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        location_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "locations_location",
              key: "id",
            },
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue:true
        },
        user_id : {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "users_user",
              key: "id",
            },
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
    return UserLocation;
  };
  