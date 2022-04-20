/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Facility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Facility.hasMany(models.FacilityComponent, {
        foreignKey: {
          name: 'facilityId'
        },
        as: 'components'
      });
      Facility.belongsTo(models.Accomodation, {
        foreignKey: {
          name: 'accomId'
        },
        as: 'accomodation'
      });
      Facility.belongsTo(models.Users, {
        foreignKey: {
          name: 'userId'
        },
        as: 'createdBy'
      });
    }
  }
  Facility.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      accomId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
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
      modelName: 'Facility',
      tableName: 'facilities',
      timestamps: true
    }
  );
  return Facility;
};
