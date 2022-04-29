/* eslint-disable no-unused-vars */

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'accomodations',
      [
        {
          id: 3,
          name: 'Serena Hotel',
          location: ['Rubavu'],
          description: 'This is a very prestigious hotel',
          latitude: '234234',
          longitude: '234324',
          userId: 'b66cfc7c-be2c-41f5-b459-e888bfe881a6',
          managerId: '861d7c9d-a8a8-4308-bce8-2c6c6a66c841',
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          id: 2,
          name: 'Silent Hill',
          description: 'This is a very silent hotel',
          latitude: '234234',
          longitude: '234324',
          location: ['Kayonza'],
          userId: 'b66cfc7c-be2c-41f5-b459-e888bfe881a6',
          managerId: '861d7c9d-a8a8-4308-bce8-2c6c6a66c841',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: 'Grand Legacy',
          description: 'This is a very silent hotel',
          latitude: '234234',
          longitude: '234324',
          location: ['Rubavu', 'Musanze'],
          userId: 'b66cfc7c-be2c-41f5-b459-e888bfe881a6',
          managerId: '861d7c9d-a8a8-4308-bce8-2c6c6a66c841',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 7,
          name: 'Hill View',
          location: ['Rubavu'],
          description: 'This is a very prestigious hotel',
          latitude: '234234',
          longitude: '234324',
          userId: 'b66cfc7c-be2c-41f5-b459-e888bfe881a6',
          managerId: 'b66cfc7c-be2c-41f5-b459-e888bfe881a6',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('accomodations', null, {});
  }
};
