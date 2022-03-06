module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn('users', 'googleId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('users', 'facebookId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.changeColumn('users', 'password', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.changeColumn('users', 'email', {
        type: Sequelize.STRING,
        allowNull: true
      })
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn('users', 'googleId'),
      queryInterface.removeColumn('users', 'facebookId'),
      queryInterface.changeColumn('users', 'email', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.changeColumn('users', 'email', {
        type: Sequelize.STRING,
        allowNull: false
      })
    ]);
  }
};
