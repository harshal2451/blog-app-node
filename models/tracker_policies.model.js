module.exports = (sequelize, Sequelize) => {
    const TrackerPolicy = sequelize.define(
      "org_tracker_policy",
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
        ss_start_min: {
          type: Sequelize.INTEGER,
          defaultValue: 5, //minute
        },
        ss_end_min: {
          type: Sequelize.INTEGER,
          defaultValue: 10, //minute
        },
        productivity_count_type : {
            type: Sequelize.STRING,
            defaultValue: 'TT', //minute
          },
        min_productivity_all: {
          type: Sequelize.INTEGER,
          defaultValue: 50
        },
        min_productivity_activity: {
          type: Sequelize.INTEGER,
          defaultValue: 10
        },
        maximum_keyboard_click:  {
          type: Sequelize.INTEGER,
          defaultValue: 30
        },
        maximum_mouse_click:  {
          type: Sequelize.INTEGER,
          defaultValue: 20
        },
        keyboard_percentage:  {
          type: Sequelize.INTEGER,
          defaultValue: 50
        },
        mouse_percentage:  {
          type: Sequelize.INTEGER,
          defaultValue: 50
        },
        min_mouse_count: {
          type: Sequelize.INTEGER,
          defaultValue: 5
        },
        min_keyboard_count: {
          type: Sequelize.INTEGER,
          defaultValue: 15  
        },
        count_keyboard_hit: {
          type: Sequelize.BOOLEAN,
          defaultValue: true, 
        },
        count_mouse_hit: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        date_format: {
            type: Sequelize.STRING,
            defaultValue:'DD-MM-YYYY'
        }
      },
      {
        freezeTableName: true,
        timestamps : true,
        paranoid : true
      }
    );
    return TrackerPolicy;
  };
  