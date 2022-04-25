/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
      models.Users.hasMany(Comments, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      Comments.belongsTo(models.Users, {
        foreignKey: 'userId'
      });

      models.Trips.hasMany(Comments, {
        foreignKey: 'tripId',
        onDelete: 'CASCADE'
      });
      Comments.belongsTo(models.Trips, {
        foreignKey: 'tripId'
      });
    }
  }

  Comments.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 500],
            msg: 'Comment has to be between 3 and 500 characters'
          }
        }
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      tripId: {
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
      modelName: 'Comments',
      tableName: 'comments',
      timestamps: true
    }
  );
  return Comments;
};
