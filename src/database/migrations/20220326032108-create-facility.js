/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('facilities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      accomId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        min: 2,
        max: 2,
        isUUID: 4
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('facilities');
  }
};
