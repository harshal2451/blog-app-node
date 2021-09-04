module.exports = (sequelize, Sequelize) => {
    const UserTitle = sequelize.define(
      "users_work_type",
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
        work_type : {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
              model: "work_type",
              key: "id",
          }
        },
        time_type : {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
              model: "time_type",
              key: "id",
          }
        },
        status : {
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
    return UserTitle;
  };
  