/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export default {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const userPassword = await bcrypt.hash('altp6@random', salt);
    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        firstname: 'Demo',
        lastname: ' User',
        email: 'demouser@cod.be',
        password: userPassword,
        isVerified: true,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { email: 'demouser@cod.be' }, {});
  }
};
