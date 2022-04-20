/* eslint-disable no-unused-vars */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Profiles',
      [
        {
          userId: 'b66cfc7c-be2c-41f5-b459-e888bfe881a6',
          gender: 'Female',
          language: 'Kinyarwanda',
          currency: 'rwf',
          location: 'Kigali',
          departement: 'ICT',
          manager: 'none',
          birthdate: '02-02-2002',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {});
  }
};
