/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
      models.Users.hasMany(Comments, {
        foreignKey: {
          name: "UserId",
          type: DataTypes.UUID,
          allowNull: false
        }
      });
      Comments.belongsTo(models.Users);

      models.Trips.hasMany(Comments, {
        foreignKey: {
          name: "TripId",
          type: DataTypes.UUID,
          allowNull: false
        }
      });
      Comments.belongsTo(models.Trips);
    }
  }

  Comments.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      comment: {
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
      modelName: 'Comments',
      tableName: 'Comments',
      timestamps: true
    }
  );
  return Comments;
};
