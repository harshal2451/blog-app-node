module.exports = (sequelize, Sequelize) => {
    const Shift = sequelize.define(
      "org_probation_policy",
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
        probation_duration : {
            type: Sequelize.INTEGER,
        },
        probation_duration_option : {
            type: Sequelize.STRING,
        },
        extended_times : {
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
    return Shift;
  };
  