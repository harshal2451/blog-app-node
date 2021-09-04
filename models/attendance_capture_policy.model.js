module.exports = (sequelize, Sequelize) => {
    const AttendanceTrackingPolicy = sequelize.define(
      "org_attendance_capture_policy",
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
        adjust_attendance: {
            type: Sequelize.BOOLEAN,
            defaultValue:false
        },
        regularise_attendance: {
            type: Sequelize.BOOLEAN,
            defaultValue:false
        },
        raise_partial_work : {
            type: Sequelize.BOOLEAN,
            defaultValue:false
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
  