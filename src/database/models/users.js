/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Accomodation, {
        foreignKey: {
          name: 'userId'
        },
        as: 'createdBy'
      });
      Users.hasMany(models.Accomodation, {
        foreignKey: {
          name: 'managerId'
        },
        as: 'managedBy'
      });
      Users.hasMany(models.Trips, {
        foreignKey: {
          name: 'userId'
        },
        as: 'ownedBy'
      });
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      facebookId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: true
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '4'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      email_token: {
        type: DataTypes.STRING,
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
      modelName: 'Users',
      tableName: 'users',
      timestamps: true
    }
  );
  return Users;
};
