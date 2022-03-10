'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      email: {
        unique:true,
        type: Sequelize.STRING,
        allowNull:false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      isVerified: {
        type: Sequelize.ENUM,
        values: ['YES', 'NO'],
        defaultValue: 'NO'
      },
      roleId: {
        type: Sequelize.INTEGER,
        defaultValue: "4",
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
    await queryInterface.dropTable('users');
  }
};
