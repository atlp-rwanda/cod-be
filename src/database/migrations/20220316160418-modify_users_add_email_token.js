/* eslint-disable no-unused-vars */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('users', 'email_token', {
        type: Sequelize.STRING,
        allowNull: true
      })
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('users', 'email_token')]);
  }
};
