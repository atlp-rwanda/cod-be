export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'bookings',
      [
        {
          id: '4f8ff145-4986-4a4d-a2a6-01d66ba5bd74',
          tripId: 'b66cfc7c-be2c-41f5-b459-e888bfe881a8',
          accomodationId: 4,
          roomId: 'e86879aa-6fe7-433a-9071-3737f523daad',
          status: 'booked',
          arrivalDate: new Date(),
          departureDate: new Date(
            new Date().getTime() + 5 * 24 * 60 * 60 * 1000
          ),
          duration: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '6f007ed5-ed85-475f-a772-9922dfcac30c',
          tripId: 'b66cfc7c-be2c-41f5-b459-e888bfe881a8',
          accomodationId: 4,
          roomId: 'e86879aa-6fe7-433a-9071-3737f523daae',
          status: 'checkedOut',
          arrivalDate: new Date(),
          departureDate: new Date(
            new Date().getTime() + 5 * 24 * 60 * 60 * 1000
          ),
          duration: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('bookings', null, {});
  }
};
