/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export default {
  async up(queryInterface, Sequelize) {
    /**
     * Super Admin Default User
     * email:superadmin@gmail.com
     * password: test@me123
     */
    const salt = await bcrypt.genSalt(10);
    const userPassword = await bcrypt.hash('test@me123', salt);
    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        firstname: 'Admin',
        lastname: ' Admin',
        email: 'superadmin@gmail.com',
        password: userPassword,
        isVerified: true,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'users',
      { email: 'superadmin@gmail.com' },
      {}
    );
  }
};
