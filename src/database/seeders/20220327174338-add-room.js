export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'rooms',
      [
        {
          id: 'ffc5ba75-1703-44bd-b000-a19f0dd445cb',
          roomNumber: 20,
          images: [
            'dd2d7bad-6429-4370-893f-82bf4e6cad2c',
            'dd2d7bad-6429-4370-893f-82bf4e6cad2c'
          ],
          description: 'Fun Room For Vacation',
          status: 'booked',
          accomodationId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'e86879aa-6fe7-433a-9071-3737f523daaf',
          roomNumber: 15,
          images: [
            'dd2d7bad-6429-4370-893f-82bf4e6cad2c',
            'dd2d7bad-6429-4370-893f-82bf4e6cad2c'
          ],
          description: 'Fun Room For Vacation',
          status: 'available',
          accomodationId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'e86879aa-6fe7-433a-9071-3737f523daad',
          roomNumber: 30,
          images: [
            'dd2d7bad-6429-4370-893f-82bf4e6cad2c',
            'dd2d7bad-6429-4370-893f-82bf4e6cad2c'
          ],
          description: 'Fun Room For Vacation',
          status: 'booked',
          accomodationId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'e86879aa-6fe7-433a-9071-3737f523daae',
          roomNumber: 13,
          images: [
            'dd2d7bad-6429-4370-893f-82bf4e6cad2c',
            'dd2d7bad-6429-4370-893f-82bf4e6cad2c'
          ],
          description: 'Fun Room For Vacation',
          status: 'booked',
          accomodationId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('rooms', null, {});
  }
};
