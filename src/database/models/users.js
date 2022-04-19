/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */

'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Accomodation, {
        foreignKey: {
          name: 'userId'
        },
        as: 'createdBy'
      });
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      facebookId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: true
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '4'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      email_token: {
        type: DataTypes.STRING,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'Users',
      tableName: 'users',
      timestamps: true
    }
  );
  return Users;
};
