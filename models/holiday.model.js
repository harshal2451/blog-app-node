module.exports = (sequelize, Sequelize) => {
    const LeavePlan = sequelize.define(
      "org_holiday",
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
        holiday_id : {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "org_holiday_list",
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
        start_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.NOW 
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
    return LeavePlan;
  };
  