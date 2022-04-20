/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
      Roles.hasMany(models.Users, {
        foreignKey: 'roleId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      models.Users.belongsTo(models.Roles, {
        foreignKey: {
          name: 'roleId'
        },
        as: 'rolename'
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
