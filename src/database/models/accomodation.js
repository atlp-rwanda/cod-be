/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Accomodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Accomodation.belongsTo(models.Users, {
        foreignKey: {
          name: 'userId'
        },
        as: 'createdBy'
      });
      Accomodation.belongsTo(models.Users, {
        foreignKey: {
          name: 'managerId'
        },
        as: 'managedBy'
      });
      models.Users.hasMany(models.Accomodation, {
        foreignKey: {
          name: 'managerId'
        }
      });
    }
  }
  Accomodation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      location: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      managerId: {
        type: DataTypes.UUID,
        allowNull: true
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
      modelName: 'Accomodation',
      tableName: 'accomodations',
      timestamps: true
    }
  );
  return Accomodation;
};
