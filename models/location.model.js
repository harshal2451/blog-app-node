module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define(
      "locations_location",
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
        email: {
          type: Sequelize.STRING,
          validate: {
            isEmail: true
          }
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        timezone : {
            type: Sequelize.STRING,
          },
        country : {
          type: Sequelize.STRING,
        },
        state : {
            type: Sequelize.STRING
        },
        status : {
          type: Sequelize.BOOLEAN,
          defaultValue:true
        },
        address1 : {
            type: Sequelize.STRING,
        },
        address2 : {
            type: Sequelize.STRING,
        },
        city : {
            type: Sequelize.STRING,
        },
        zip: {
            type: Sequelize.INTEGER,
        },
        description :{
          type: Sequelize.TEXT
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
    return Location;
  };
  