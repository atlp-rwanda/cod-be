/* eslint-disable require-jsdoc */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('accomodations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false
    },
    latitude: {
      type: Sequelize.STRING,
      allowNull: false
    },
    longitude: {
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
    managerId: {
      type: Sequelize.UUID,
      allowNull: true,
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
}
export async function down(queryInterface) {
  await queryInterface.dropTable('accomodations');
}
