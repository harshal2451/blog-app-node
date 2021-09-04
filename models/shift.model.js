module.exports = (sequelize, Sequelize) => {
    const Shift = sequelize.define(
      "org_shift",
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
        shift_code : {
            type: Sequelize.STRING,
        },
        description : {
            type: Sequelize.TEXT,
        },
        start_timing : {
            type: Sequelize.STRING,
        },
        end_timing : {
            type: Sequelize.STRING,
        },
        break_duration : {
            type: Sequelize.STRING,
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
    return Shift;
  };
  