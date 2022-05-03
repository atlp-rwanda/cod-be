/* eslint-disable require-jsdoc */

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Bookings extends Model {
    static associate(models) {
      Bookings.belongsTo(models.Trips, {
        foreignKey: {
          name: 'tripId'
        },
        as: 'bookedBy'
      });
      models.Trips.hasMany(models.Bookings, {
        foreignKey: {
          name: 'tripId'
        },
        as: 'bookedBy',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Bookings.belongsTo(models.Accomodation, {
        foreignKey: {
          name: 'accomodationId'
        },
        as: 'bookedIn'
      });
      models.Accomodation.hasMany(models.Bookings, {
        foreignKey: {
          name: 'accomodationId'
        },
        as: 'bookedIn',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Bookings.belongsTo(models.Rooms, {
        foreignKey: {
          name: 'roomId'
        },
        as: 'room'
      });
      models.Rooms.hasMany(models.Bookings, {
        foreignKey: {
          name: 'roomId'
        },
        as: 'room',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Bookings.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      status: {
        type: DataTypes.ENUM({
          values: ['booked', 'checkedOut', 'checkedIn']
        }),
        defaultValue: 'booked'
      },
      arrivalDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      departureDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Bookings',
      tableName: 'bookings',
      timestamps: true
    }
  );
  return Bookings;
};
