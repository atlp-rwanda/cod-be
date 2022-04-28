/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ChatMessage extends Model {
    static associate(models) {
      models.Users.hasMany(ChatMessage, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      ChatMessage.belongsTo(models.Users, {
        foreignKey: 'userId'
      });
    }
  }

  ChatMessage.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      room: {
        type: DataTypes.STRING,
        default: 'barefoot',
        allowNull: false
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 500],
            msg: 'Message should not exceed 500 characters'
          }
        }
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
      modelName: 'ChatMessage',
      tableName: 'chatMessages',
      timestamps: true
    }
  );
  return ChatMessage;
};
