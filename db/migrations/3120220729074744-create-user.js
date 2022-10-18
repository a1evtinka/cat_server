'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.TEXT
      },
      userTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'UserTypes',
          key: 'id',
        },
      },
      firstName: {
        type: Sequelize.TEXT
      },
      lastName: {
        type: Sequelize.TEXT
      },
      photo: {
        type: Sequelize.TEXT
      },
      profession: {
        type: Sequelize.TEXT
      },
      birthday: {
        type: Sequelize.DATE
      },
      genderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Genders',
          key: 'id',
        },
      },
      countryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Countries',
          key: 'id',
        },
      },
      city: {
        type: Sequelize.TEXT
      },
      interests: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Users');
  }
};