module.exports = (sequelize, Sequelize) => {
    const LeaveDeduction = sequelize.define(
      "org_leave_deduction_policy",
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
        is_sandwitch_rule : {
            type: Sequelize.BOOLEAN
        },
        min_days_sandwich_rule: {
            type: Sequelize.INTEGER
        },
        deduction_ratio: {
            type: Sequelize.INTEGER,
            defaultValue:1
        },
        is_hourly_cut : {
            type: Sequelize.BOOLEAN
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue:true
        },
      },
      {
        freezeTableName: true,
        timestamps : true,
        paranoid : true
      }
    );
    return LeaveDeduction;
  };
  