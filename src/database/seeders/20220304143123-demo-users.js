/* eslint-disable no-unused-vars */
/* eslint-disable strict */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 'b66cfc7c-be2c-41f5-b459-e888bfe881a6',
          firstname: 'Alex Axel',
          lastname: 'Mucyo',
          email: 'mcy@cod.com',
          password:
            '$2b$10$PbmyjAmjzHhFqhrTagGf3um2kurk0b.JfugGOTGVHWrEoYWSuuyda',
          isVerified: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          id: 'b66cfc7c-be2c-41f5-b459-e888bfe881a7',
          firstname: 'Kevin',
          lastname: 'Rukundo',
          email: 'kevin@cod.com',
          password:
            '$2b$10$PbmyjAmjzHhFqhrTagGf3um2kurk0b.JfugGOTGVHWrEoYWSuuyda',
          isVerified: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
