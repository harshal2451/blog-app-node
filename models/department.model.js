module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define(
      "departments_department",
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
        title : {
          type: Sequelize.STRING,
        },
        description : {
            type: Sequelize.TEXT,
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue:true
        },
        head : {
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
    return Department;
  };
  