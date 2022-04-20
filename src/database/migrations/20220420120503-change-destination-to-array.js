/* eslint-disable require-jsdoc */
export async function up(queryInterface, Sequelize) {
  queryInterface.changeColumn('trips', 'destination', {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue:[]
  });
}

export async function down(queryInterface,Sequelize) {
  queryInterface.changeColumn('trips', 'destination', {
    type: Sequelize.STRING
  });
}
