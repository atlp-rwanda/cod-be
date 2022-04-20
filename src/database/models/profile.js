/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.hasOne(models.Users, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Profile.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true
      },
      language: {
        type: DataTypes.STRING,
        allowNull: true
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: true
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true
      },
      departement: {
        type: DataTypes.STRING,
        allowNull: true
      },
      manager: {
        type: DataTypes.STRING,
        allowNull: true
      },
      birthdate: {
        type: DataTypes.DATE,
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
      modelName: 'Profile',
      tableName: 'Profiles',
      timestamps: true
    }
  );
  return Profile;
};
