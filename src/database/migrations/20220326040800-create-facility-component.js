/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('facility_components', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      facilityId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      price: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      booking: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('facility_components');
  }
};
