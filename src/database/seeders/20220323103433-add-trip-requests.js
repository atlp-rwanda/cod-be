export default {
  async up(queryInterface) {
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
        },
        {
          id: 'b66cfc7c-be2c-41f5-b459-e888bfe881a8',
          departure: 'Butare',
          destination: ['Kigali'],
          dateOfTravel: new Date(),
          dateOfReturn: new Date(
            new Date().getTime() + 5 * 24 * 60 * 60 * 1000
          ),
          travelReason: 'Holidays',
          status: 'approved',
          accomodationId: 4,
          userId: 'd53e3469-661e-40c0-a2bb-d66e0e5fa16e',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '5ded92bb-69c2-414c-8ad8-7c0f4096e9cd',
          departure: 'Butare',
          destination: ['Kigali'],
          dateOfTravel: new Date(),
          dateOfReturn: new Date(
            new Date().getTime() + 5 * 24 * 60 * 60 * 1000
          ),
          travelReason: 'Holidays',
          status: 'approved',
          accomodationId: 4,
          userId: 'd53e3469-661e-40c0-a2bb-d66e0e5fa16e',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '5ded92bb-69c2-414c-8ad8-7c0f4096e9ce',
          departure: 'Butare',
          destination: ['Kigali'],
          dateOfTravel: new Date(),
          dateOfReturn: new Date(
            new Date().getTime() + 5 * 24 * 60 * 60 * 1000
          ),
          travelReason: 'Holidays',
          status: 'pending',
          accomodationId: 4,
          userId: 'd53e3469-661e-40c0-a2bb-d66e0e5fa16e',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '5ded92bb-69c2-414c-8ad8-7c0f4096e9cf',
          departure: 'Butare',
          destination: ['Kigali'],
          dateOfTravel: new Date(),
          dateOfReturn: new Date(
            new Date().getTime() + 5 * 24 * 60 * 60 * 1000
          ),
          travelReason: 'Holidays',
          status: 'rejected',
          accomodationId: 4,
          userId: 'd53e3469-661e-40c0-a2bb-d66e0e5fa16e',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('trips', null, {});
  }
};
