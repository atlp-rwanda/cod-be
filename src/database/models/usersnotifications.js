/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserNotification extends Model {
    static associate(models) {
      UserNotification.belongsTo(models.Users, {
        foreignKey: 'userId'
      });
    }
  }

  UserNotification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      type: {
        type: DataTypes.ENUM('email', 'application'),
        defaultValue: 'application'
      },
      isAllowed: {
        type: DataTypes.BOOLEAN,
        defaultValue: 'false'
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
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
      modelName: 'UserNotification',
      tableName: 'users_notifications',
      timestamps: true
    }
  );
  return UserNotification;
};
