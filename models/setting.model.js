module.exports = (sequelize, Sequelize) => {
  const Setting = sequelize.define(
    "tracker_setting",
    {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users_user",
          key: "id",
        },
      },
      tracking_interval: {
        type: Sequelize.INTEGER,
        defaultValue: 10, //minute
      },
      activity_update_interval: {
        type: Sequelize.INTEGER,
        defaultValue: 30, //minute
      },
      idle_timeout: {
        type: Sequelize.INTEGER,
        defaultValue: 10, //minute
      },
      take_screenshot: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      resume_tracking: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      review_screenshot: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      screenshot_review_time: {
        type: Sequelize.INTEGER,
        defaultValue: 10, // seconds
      },
      memo_review_time: {
        type: Sequelize.INTEGER,
        defaultValue: 10, // seconds
      },
      count_keyboard_hit: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      count_mouse_hit: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      random_tracking: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      ask_desc_on_start: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      screenshot_interval: {
        type: Sequelize.INTEGER,
        defaultValue: 10, // seconds
      },
      ask_desc_on_stop: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
  return Setting;
};
