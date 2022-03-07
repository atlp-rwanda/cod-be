'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('offices', [
        {
          id: 1,
          office_name: 'Barefoot Nomad Head Quarters',
          office_type: 'Head Quarters',
          country: 'Rwanda',
          province: 'Kigali',
          address: 'KK 774 St',
          created_at: new Date(),
          updated_at: new Date(),

        },

        {
          id: 2,
          office_name: 'Barefoot Nomad Nyarutarama Branch',
          office_type: 'Branch',
          country: 'Rwanda',
          province: 'Kigali',
          address: 'KG 774 St',
          created_at: new Date(),
          updated_at: new Date(),

        },

        {
          id: 3,
          office_name: 'Barefoot Nomad Gisenyi Branch',
          office_type: 'Branch',
          country: 'Rwanda',
          province: 'Western',
          address: 'WR 774 St',
          created_at: new Date(),
          updated_at: new Date(),

        },
        
      ], {}
    
    );
    
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('offices', null, {});
      await queryInterface.bulkDelete('users', null, {});
     
  }
};
