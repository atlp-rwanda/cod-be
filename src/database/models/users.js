/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */

'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    email: {
      unique:true,
      type: DataTypes.STRING,
      allowNull:false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue: "4",
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    isVerified: {
      type: DataTypes.ENUM('YES', 'NO'),
      defaultValue: 'NO'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    timestamps: true,
  });
  return Users;
};
