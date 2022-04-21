/* eslint-disable require-jsdoc */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('trips', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    departure: {
      type: Sequelize.STRING,
      allowNull: false
    },
    destination: {
      type: Sequelize.STRING,
      allowNull: true
    },
    dateOfTravel: {
      type: Sequelize.DATE,
      allowNull: false
    },
    dateOfReturn: {
      type: Sequelize.DATE,
      allowNull: true
    },
    travelReason: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
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
  await queryInterface.dropTable('trips');
}
