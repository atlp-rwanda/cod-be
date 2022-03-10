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
        unique:true
      },
      description: {
        type: Sequelize.STRING
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
        description:'IT Office Administrator',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id:2,
        roleName:'Travel Administrator',
        description:'Travel Agency Administrator',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id:3,
        roleName:'Manager',
        description:'Travel Agency Manager',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        id:4,
        roleName:'Requester',
        description:'Travel Agency Service Requester',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
  }
};
