module.exports = (sequelize, Sequelize) => {
    const Memo = sequelize.define(
      "tracker_memo",
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
        project_id : {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
              model: "projects_project",
              key: "id",
          }
        },
        description: {
            type: Sequelize.TEXT,
        },
        status : {
          type: Sequelize.INTEGER,
          references: {
              model: "tracker_status",
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
    return Memo;
  };
  