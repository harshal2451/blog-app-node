module.exports = (sequelize, Sequelize) => {
  const Project_member = sequelize.define(
    "projects_project_member",
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
          model: 'users_user',
          key: 'id'
        }
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'projects_project',
          key: 'id'
        }
      },
      role: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'role_role',
          key: 'id'
        }
      },
      rate: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      currency: {
        type: Sequelize.STRING,
        defaultValue: "$",
      },
      display_to_team: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_manual_entry_allowed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
  return Project_member;
};
