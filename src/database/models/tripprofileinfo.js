/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class TripProfileInfo extends Model {
    static associate(models) {
      models.Users.hasMany(TripProfileInfo, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      TripProfileInfo.belongsTo(models.Users, {
        foreignKey: 'userId'
      });

      models.Trips.hasMany(TripProfileInfo, {
        foreignKey: 'tripId',
        onDelete: 'CASCADE'
      });
      TripProfileInfo.belongsTo(models.Trips, {
        foreignKey: 'tripId'
      });
    }
  }

  TripProfileInfo.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
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
      modelName: 'TripProfileInfo',
      tableName: 'tripProfileInfos',
      timestamps: true
    }
  );
  return TripProfileInfo;
};
