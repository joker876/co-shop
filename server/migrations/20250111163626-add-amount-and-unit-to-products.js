'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'amount', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn('products', 'unit', {
      type: Sequelize.ENUM(
        'pc', // piece
        'box', // boxes
        'kg', // kilogram
        'dag', // decagram
        'g', // gram
        'lb', // pound
        'oz', // ounce
        'l', // liter
        'ml', // milliliter
        'floz', // fluid ounce
        'gal', // gallon
      ),
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'unit');
    await queryInterface.removeColumn('products', 'amount');
  }
};
