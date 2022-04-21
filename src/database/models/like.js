/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Users.hasMany(Like, {
        onDelete: 'CASCADE',
        foreignKey: 'userId'
      });
      Like.belongsTo(models.Users, {
        foreignKey: {
          name: 'userId'
        },
        allowNull: false
      });

      models.Accomodation.hasMany(Like, {
        onDelete: 'CASCADE',
        foreignKey: 'accomodationId'
      });
      Like.belongsTo(models.Accomodation, {
        foreignKey: 'accomodationId',
        allowNull: false
      });
    }
  }
  Like.init(
    {
      accomodationId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      likeStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Like',
      tableName: 'likes'
    }
  );
  return Like;
};
