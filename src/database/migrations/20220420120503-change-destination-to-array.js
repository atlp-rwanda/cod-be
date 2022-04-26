/* eslint-disable require-jsdoc */
export async function up(queryInterface) {
  queryInterface.sequelize.query(
    'ALTER TABLE trips ALTER COLUMN destination TYPE VARCHAR [] USING destination::character varying[];'
  );
  queryInterface.sequelize.query(
    'ALTER TABLE accomodations ALTER COLUMN location TYPE VARCHAR [] USING location::character varying[];'
  );
}

export async function down(queryInterface, Sequelize) {
  queryInterface.changeColumn('trips', 'destination', {
    type: Sequelize.STRING
  });
  queryInterface.changeColumn('accomodations', 'location', {
    type: Sequelize.STRING
  });
}
