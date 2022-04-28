/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('notifications', 'category', {
    type: Sequelize.ENUM('created', 'updated', 'status', 'comment'),
    allowNull: false
  });
}
export async function down(queryInterface) {
  await queryInterface.removeColumn('notifications', 'category');
}
