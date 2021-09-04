module.exports = (sequelize, Sequelize) => {
    const EmployeeSeries = sequelize.define(
      "employee_series",
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
        name: {
            type: Sequelize.STRING,
          },
        description: {
          type: Sequelize.TEXT,
        },
        prefix: {
          type: Sequelize.STRING,
        },
        suffix: {
            type: Sequelize.STRING,
          },
        number_preview: {
            type: Sequelize.STRING,
        },
        next_number : {
            type: Sequelize.INTEGER,
        },
        digit : {
            type: Sequelize.INTEGER,
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
    return EmployeeSeries;
  };
  