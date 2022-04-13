/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      models.Users.hasMany(Feedback, {
        foreignKey: 'userId'
      });
      Feedback.belongsTo(models.Users, {
        foreignKey: 'userId'
      });

      models.Accomodation.hasMany(Feedback, {
        foreignKey: 'accomodationId'
      });
      Feedback.belongsTo(models.Accomodation, {
        foreignKey: 'accomodationId'
      });
    }
  }
  Feedback.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      feedback: {
        type: DataTypes.STRING,
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
      modelName: 'Feedback',
      tableName: 'feedbacks'
    }
  );
  return Feedback;
};
