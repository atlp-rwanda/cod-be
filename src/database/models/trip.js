/* eslint-disable require-jsdoc */

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Trips extends Model {
    static associate(models) {
      Trips.belongsTo(models.Accomodation, { foreignKey: 'accomodationId' });
      models.Accomodation.hasMany(models.Trips, {
        foreignKey: 'accomodationId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Trips.belongsTo(models.Users, { foreignKey: 'userId' });
      models.Users.hasMany(models.Trips, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Trips.belongsTo(models.Users, {
        foreignKey: {
          name: 'userId'
        },
        as: 'ownedBy'
      });
      Trips.belongsTo(models.Users, {
        foreignKey: {
          name: 'userId'
        },
        as: 'managedBy'
      });
    }
  }

  Trips.init(
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
      accomodationId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      departure: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destination: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      dateOfTravel: {
        type: DataTypes.DATE,
        allowNull: false
      },
      dateOfReturn: {
        type: DataTypes.DATE,
        allowNull: true
      },
      travelReason: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
      }
    },
    {
      sequelize,
      modelName: 'Trips',
      tableName: 'trips',
      timestamps: true
    }
  );
  return Trips;
};
