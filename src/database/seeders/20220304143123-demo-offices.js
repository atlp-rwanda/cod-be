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

    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        f_name: 'Barefoot',
        l_name: 'Nomad',
        email: 'barefootnomad@bn.com',
        role: 'Manager',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: 2,
        f_name: 'John',
        l_name: 'Doe',
        email: 'johndoe@bn.com',
        role: 'Employee',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: 3,
        f_name: 'Alex',
        l_name: 'Axel',
        email: 'alexaxel@bn.com',
        role: 'Client',
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
