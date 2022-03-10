'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roleName: {
        type: Sequelize.STRING,
        allowNull:false,
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
    await queryInterface.bulkInsert("roles",[
      {
        id:1,
        roleName:'Super Administrator',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id:2,
        roleName:'Travel Administrator',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id:3,
        roleName:'Manager',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id:4,
        roleName:'Requester',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
  }
};
