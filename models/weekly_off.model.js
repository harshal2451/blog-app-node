module.exports = (sequelize, Sequelize) => {
    const WeeklyOff = sequelize.define(
      "org_weekly_off",
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
        description : {
            type: Sequelize.TEXT,
        },
        days: {
            type: Sequelize.TEXT,
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
    return WeeklyOff;
  };
  