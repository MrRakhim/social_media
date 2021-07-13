'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
		allowNull: false,
        type: Sequelize.INTEGER
      },
      text: {
		allowNull: false,
        type: Sequelize.STRING
      },
      responseId: {
        type: Sequelize.INTEGER
      },
      date: {
		allowNull: false,
        type: Sequelize.DATE
      },
      productId: {
		allowNull: false,
        type: Sequelize.INTEGER
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  }
};