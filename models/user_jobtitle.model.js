module.exports = (sequelize, Sequelize) => {
    const UserTitle = sequelize.define(
      "users_job_title",
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
        job_id : {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
              model: "job_titles",
              key: "id",
          }
        },
        organization_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "organizations_organization",
            key: "id",
          },
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
  