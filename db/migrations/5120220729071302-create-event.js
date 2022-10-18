'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      maxParticipants: {
        type: Sequelize.INTEGER
      },
      round: {
        type: Sequelize.INTEGER
      },
      eventTitle: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      statusId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'EventStatuses',
          key: 'id',
        },
      },
      budget: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  }
};