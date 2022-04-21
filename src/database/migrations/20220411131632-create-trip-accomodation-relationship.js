/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('trips', 'accomodationId', {
    type: Sequelize.INTEGER,
    references: {
      model: 'accomodations',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });
  await queryInterface.addColumn('trips', 'userId', {
    type: Sequelize.UUID,
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });
}
export async function down(queryInterface) {
  await queryInterface.removeColumn('trips', 'accomodationId');
  await queryInterface.removeColumn('trips', 'userId');
}
