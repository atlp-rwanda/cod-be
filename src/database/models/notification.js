/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  
  class Notification extends Model {
    
    static associate(models) {
      models.Users.hasMany(Notification, {
        onDelete: 'CASCADE',
        foreignKey: 'userId'
      });
      Notification.belongsTo(models.Users, {
        foreignKey: {
          name: 'userId'
        },
        allowNull: false
      });
    }
  }
  Notification.init({
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Notification',
    tableName: 'notifications'
  });
  return Notification;
};