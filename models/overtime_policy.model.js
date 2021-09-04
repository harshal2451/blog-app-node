module.exports = (sequelize, Sequelize) => {
    const OvertimePolicy = sequelize.define(
      "org_overtime_policy",
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
        min_productivity : {
            type: Sequelize.INTEGER,
            defaultValue:30
        },
        overtime_ratio: {
            type: Sequelize.INTEGER,
            defaultValue:1
        },
        allow_probation : {
            type: Sequelize.BOOLEAN,
            defaultValue:false
        },
        allow_notice: {
            type: Sequelize.BOOLEAN,
            defaultValue:true
        }
      },
      {
        freezeTableName: true,
        timestamps : true,
        paranoid : true
      }
    );
    return OvertimePolicy;
  };
  