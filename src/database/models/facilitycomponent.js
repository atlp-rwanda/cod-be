/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class FacilityComponent extends Model {
    static associate(models) {
      FacilityComponent.belongsTo(models.Facility, {
        foreignKey: {
          name: 'facilityId'
        },
        as: 'facility'
      });
      FacilityComponent.belongsTo(models.Users, {
        foreignKey: {
          name: 'userId'
        },
        as: 'addedBy'
      });
    }
  }

  FacilityComponent.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      facilityId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      booking: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
      modelName: 'FacilityComponent',
      tableName: 'facility_components',
      timestamps: true
    }
  );
  return FacilityComponent;
};
