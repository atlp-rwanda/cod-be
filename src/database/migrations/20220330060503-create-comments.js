/* eslint-disable no-unused-vars */

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Comments', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        isUUID: 4,
      },
      TripId: {
        type: DataTypes.UUID,
        allowNull: false,
        isUUID: 4,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};