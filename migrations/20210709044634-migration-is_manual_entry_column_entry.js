'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'tracker_activity',
        'is_manual_entry',
        {
          type: Sequelize.BOOLEAN,
          defaultValue:false
        }
      ),
      queryInterface.changeColumn(
        'tracker_activity',
        'project_id',
        {
          type: Sequelize.INTEGER,
          allowNull:true,
          references: {
            model: 'projects_project',
            key: 'id'
          }
        }
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
