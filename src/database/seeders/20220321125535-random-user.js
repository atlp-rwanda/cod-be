/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export default {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const userPassword = await bcrypt.hash('altp6@random', salt);
    await queryInterface.bulkInsert('users', [
      {
        id: 'b66cfc7c-be2c-41f5-b459-e888bfe881a1',
        firstname: 'Demo',
        lastname: 'User',
        email: 'demouser@cod.be',
        password: userPassword,
        isVerified: true,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b66cfc7c-be2c-41f5-b459-e888bfe881a2',
        firstname: 'Demo2',
        lastname: ' User2',
        email: 'demouser2@cod.be',
        password: userPassword,
        isVerified: true,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b66cfc7c-be2c-41f5-b459-e888bfe881a6',
        firstname: 'Alex Axel',
        lastname: 'Mucyo',
        email: 'mcy@cod.com',
        password:
          '$2b$10$PbmyjAmjzHhFqhrTagGf3um2kurk0b.JfugGOTGVHWrEoYWSuuyda',
        roleId: 2,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b66cfc7c-be2c-41f5-b459-e888bfe881a7',
        firstname: 'Kevin',
        lastname: 'Rukundo',
        email: 'kevin@cod.com',
        password:
          '$2b$10$PbmyjAmjzHhFqhrTagGf3um2kurk0b.JfugGOTGVHWrEoYWSuuyda',
        roleId: 4,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '861d7c9d-a8a8-4308-bce8-2c6c6a66c841',
        firstname: 'Manager',
        lastname: 'One',
        email: 'manager1@cod.be',
        password: userPassword,
        isVerified: true,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'd53e3469-661e-40c0-a2bb-d66e0e5fa19d',
        firstname: 'Manager',
        lastname: 'Two',
        email: 'manager2@cod.be',
        password: userPassword,
        isVerified: true,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '861d7c9d-a8a8-4308-bce8-2c6c6a66c831',
        firstname: 'Manager',
        lastname: 'Three',
        email: 'manager3@cod.be',
        password: userPassword,
        isVerified: true,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'd53e3469-661e-40c0-a2bb-d66e0e5fa16e',
        firstname: 'Random',
        lastname: 'Person',
        email: 'random@gmail.com',
        password: userPassword,
        isVerified: true,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '861d7c9d-a8a8-4308-bce8-2c6c6a66c847',
        firstname: 'New Random',
        lastname: 'Person',
        email: 'random1@gmail.com',
        password: userPassword,
        isVerified: true,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
