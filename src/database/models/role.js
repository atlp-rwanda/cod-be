/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
      Roles.hasMany(models.Users, {
        foreignKey: 'roleId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Roles.init(
    {
      roleName: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Roles',
      tableName: 'roles',
      timestamps: true
    }
  );
  return Roles;
};
