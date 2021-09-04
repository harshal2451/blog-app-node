module.exports = (sequelize, Sequelize) => {
    const AttendanceTrackingPolicy = sequelize.define(
      "org_attendance_tracking_policy",
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
        week_start_from: {
            type: Sequelize.STRING
        },
        month_start_from: {
            type: Sequelize.INTEGER
        },
        no_attendance: {
            type: Sequelize.BOOLEAN
        },
        late_arrival: {
            type: Sequelize.STRING
        },
        shortage_hours: {
            type: Sequelize.BOOLEAN
        },
        shortage_type: {
            type: Sequelize.STRING
        },
        missing_swipes: {
            type: Sequelize.BOOLEAN
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
    return AttendanceTrackingPolicy;
  };
  