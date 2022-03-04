'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('offices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      office_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      office_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      f_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      l_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    
    await queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      emp_fname: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users',
          key: 'f_name'
        }
      },
      emp_lname: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users',
          key: 'l_name'
        }
      },
      emp_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'email'
        }
      },
      emp_role: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users',
          key: 'role'
        }
      },
      office_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'offices',
          key: 'id'
        }
      },
      emp_office: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'offices',
          key: 'office_name'
        }
      },
      office_type: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'offices',
          key: 'office_type'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  }
};