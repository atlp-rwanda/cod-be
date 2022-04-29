export default {
  async up(queryInterface) {
    try {
      await queryInterface.bulkInsert(
        'trips',
        [
          {
            id: 'b66cfc7c-be2c-41f5-b459-e888bfe881a6',
            departure: 'Huye',
            destination: ['Rwamagana'],
            dateOfTravel: new Date(),
            dateOfReturn: new Date(),
            travelReason: 'I am traveling for fun',
            status: 'pending',
            accomodationId: 3,
            userId: 'b66cfc7c-be2c-41f5-b459-e888bfe881a6',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 'b66cfc7c-be2c-41f5-b459-e888bfe881b9',
            departure: 'Muhanga',
            destination: ['Kigali'],
            dateOfTravel: new Date(),
            dateOfReturn: new Date(),
            travelReason: 'I am traveling on business',
            status: 'pending',
            accomodationId: 2,
            userId: 'b66cfc7c-be2c-41f5-b459-e888bfe881a6',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '5ded92bb-69c2-414c-8ad8-7c0f4096e9cb',
            departure: 'Butare',
            destination: ['Kigali'],
            dateOfTravel: new Date('2022-04-10 02:20:48.481+02'),
            dateOfReturn: new Date(),
            travelReason: 'Holidays',
            status: 'approved',
            accomodationId: 3,
            userId: 'b66cfc7c-be2c-41f5-b459-e888bfe881a2',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '5ded92bb-69c2-414c-8ad8-7c0f4096e9cc',
            departure: 'Butare2',
            destination: ['Kigali2'],
            dateOfTravel: new Date(),
            dateOfReturn: new Date(),
            travelReason: 'Holidays',
            status: 'approved',
            accomodationId: 2,
            userId: 'b66cfc7c-be2c-41f5-b459-e888bfe881a2',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      );
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('trips', null, {});
  }
};
