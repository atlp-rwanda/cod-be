/* eslint-disable no-unused-vars */
/* eslint-disable strict */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: 99,
        uuid: 'b66cfc7c-be2c-41f5-b459-e888bfe881a6',
        fName: 'Alex Axel',
        lName: 'Mucyo',
        email: 'mcy@cod.com',
        password: 'Kigali',
        verified: false,
        createdAt: new Date(),
        updatedAt: new Date(),

      },

      {
        id: 100,
        uuid: 'b66cfc7c-be2c-41f5-b459-e888bfe881a7',
        fName: 'Kevin',
        lName: 'Rukundo',
        email: 'kevin@cod.com',
        password: 'Kigali',
        verified: false,
        createdAt: new Date(),
        updatedAt: new Date(),

      },

      {
        id: 102,
        uuid: 'b66cfc7c-be2c-41f5-b459-e888bfe881a8',
        fName: 'Faustin',
        lName: 'Iyaremye',
        email: 'faustin@cod.com',
        password: 'Kigali',
        verified: false,
        createdAt: new Date(),
        updatedAt: new Date(),

      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
