'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('offices', [
        {
          id: 99,
          uuid: 'b66cfc7c-be2c-41f5-b459-e888bfe881a6',
          officeName: 'Barefoot Nomad Head Quarters',
          officeType: 'Head Quarters',
          country: 'Rwanda',
          state: 'Kigali',
          address: 'KK 774 St',
          createdAt: new Date(),
          updatedAt: new Date(),

        },

        {
          id: 100,
          uuid: 'b66cfc7c-be2c-41f5-b459-e888bfe881a7',
          officeName: 'Barefoot Nomad Nyarutarama Branch',
          officeType: 'Branch',
          country: 'Rwanda',
          state: 'Kigali',
          address: 'KG 774 St',
          createdAt: new Date(),
          updatedAt: new Date(),

        },
        
        {
          id: 102,
          uuid: 'b66cfc7c-be2c-41f5-b459-e888bfe881a8',
          officeName: 'Barefoot Nomad Gisenyi Branch',
          officeType: 'Branch',
          country: 'Rwanda',
          state: 'Western',
          address: 'WR 774 St',
          createdAt: new Date(),
          updatedAt: new Date(),

        },
        
      ], {}
    
    );
    
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('offices', null, {});
      await queryInterface.bulkDelete('users', null, {});
     
  }
};
