module.exports = (sequelize, Sequelize) => {
    const UORelation = sequelize.define(
      "users_organizations",
      {
        id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        organization_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "organizations_organization",
            key: "id",
          },
        },
        user_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "users_user",
              key: "id",
            },
          },
        role : {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
              model: "role_role",
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
    return UORelation;
  };
  