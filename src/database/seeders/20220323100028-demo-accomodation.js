/* eslint-disable no-unused-vars */
/* eslint-disable strict */
/* eslint-disable import/no-import-module-exports */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        'accomodations',
        [
          {
            id: 3,
            name: 'Serena Hotel',
            location: 'Rubavu',
            description: "This is a very prestigious hotel",
            latitude:'234234',
            longitude:"234324",
            userId:"b66cfc7c-be2c-41f5-b459-e888bfe881a6",
            managerId:'b66cfc7c-be2c-41f5-b459-e888bfe881a6',
            createdAt: new Date(),
            updatedAt: new Date()
          },
  
          {
            id: 2,
            name: 'Silent Hill',
            description: "This is a very silent hotel",
            latitude:'234234',
            longitude:"234324",
            location: 'Kayonza',
            userId:"b66cfc7c-be2c-41f5-b459-e888bfe881a6",
            managerId:'b66cfc7c-be2c-41f5-b459-e888bfe881a6',
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ],
        {}
      );
    } catch (error) {
       console.log(error)
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('accomodations', null, {});
  }
};