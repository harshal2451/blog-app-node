module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define(
      "user_reporting",
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
        reporting_to: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "users_user",
              key: "id",
            },
        },
        user_id : {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "users_user",
              key: "id",
            },
        },
        emp_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "org_employee",
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
    return Department;
  };
  