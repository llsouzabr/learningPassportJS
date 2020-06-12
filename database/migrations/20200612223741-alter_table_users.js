'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users',
      'last_login', {
        type: Sequelize.DATE,
        allow_nul: true,
       },
      ),
      queryInterface.addColumn('Users',
      'resetPasswordToken', {
         type: Sequelize.STRING,
         allowNull: true,
       },
      ),
      queryInterface.addColumn('Users',
      'resetPasswordExpires', {
         type: Sequelize.DATE,
         allowNull: true,
       },
      ),
    ]);

  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'last_login'),
      queryInterface.removeColumn('Users', 'resetPasswordToken'),
      queryInterface.removeColumn('Users', 'resetPasswordExpires'),
    ])
  }
};
