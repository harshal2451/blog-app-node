module.exports = (sequelize, Sequelize) => {
  const Activity = sequelize.define(
    "tracker_activity",
    {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      organization_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "organizations_organization",
          key: "id",
        },
      },
      project_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'projects_project',
          key: 'id'
        }
      },
      member_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users_user',
          key: 'id'
        }
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
      },
      duration: {
        type: Sequelize.STRING,
      },
      is_manual_entry : {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      productive_duration: {
        type: Sequelize.INTEGER,
      },
      keyboard_mouse_count: {
          type: Sequelize.TEXT
      },
      productivity: {
          type: Sequelize.INTEGER,
          defaultValue:0
      },
      memo_id : {
        type: Sequelize.INTEGER,
          references: {
            model: "tracker_memo",
            key: "id",
          },
          allowNull: true 
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
  return Activity;
};
