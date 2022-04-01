/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Users.hasMany(Rating, {
        onDelete: 'CASCADE',
        foreignKey: 'userId'
      });
      Rating.belongsTo(models.Users, {
        foreignKey: {
          name: 'userId'
        },
        allowNull: false
      });

      models.Accomodation.hasMany(Rating, {
        onDelete: 'CASCADE',
        foreignKey: 'accomodationId'
      });
      Rating.belongsTo(models.Accomodation, {
        foreignKey: 'accomodationId',
        allowNull: false
      });
    }
  }
  Rating.init(
    {
      accomodationId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false
      },
      serviceRating: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Rating',
      tableName: 'ratings'
    }
  );
  return Rating;
};
