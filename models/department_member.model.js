module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define(
      "departments_member",
      {
        id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        department_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "departments_department",
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
    return Department;
  };
  