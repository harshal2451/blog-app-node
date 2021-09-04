module.exports = (sequelize, Sequelize) => {
    const BusinessUnit = sequelize.define(
      "business_unit",
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
        name : {
          type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
            isEmail: true
            }
          },
        description : {
            type: Sequelize.TEXT,
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
    return BusinessUnit;
  };
  