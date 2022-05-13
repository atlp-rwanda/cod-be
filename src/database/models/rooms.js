/* eslint-disable require-jsdoc */

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Rooms extends Model {
    static associate(models) {
      Rooms.belongsTo(models.Accomodation, {
        foreignKey: {
          name: 'accomodationId'
        },
        as: 'accomodation'
      });
      models.Accomodation.hasMany(models.Rooms, {
        foreignKey: {
          name: 'accomodationId'
        },
        as: 'accomodation',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Rooms.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      roomNumber: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM({
          values: ['available', 'booked']
        }),
        defaultValue: 'available'
      }
    },
    {
      sequelize,
      modelName: 'Rooms',
      tableName: 'rooms',
      timestamps: true
    }
  );
  return Rooms;
};
