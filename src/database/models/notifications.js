/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      models.Users.hasMany(Notification, {
        foreignKey: 'addedBy',
        onDelete: 'CASCADE'
      });
      Notification.belongsTo(models.Users, {
        foreignKey: 'addedBy'
      });
      Notification.belongsTo(models.Trips, {
        foreignKey: 'tripId'
      });
    }
  }

  Notification.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('email', 'application'),
        defaultValue: 'application'
      },
      category: {
        type: DataTypes.ENUM('created', 'updated', 'status', 'comment'),
        allowNull: false
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: 'false'
      },
      tripId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      addedBy: {
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
      modelName: 'Notification',
      tableName: 'notifications',
      timestamps: true
    }
  );
  return Notification;
};
