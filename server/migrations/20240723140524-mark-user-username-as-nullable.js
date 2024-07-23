'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn('users', 'username', { type: Sequelize.STRING(48), allowNull: true });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.changeColumn('users', 'username', { type: Sequelize.STRING(48), allowNull: false });
  }
};
