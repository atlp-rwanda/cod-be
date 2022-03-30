/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Trips extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      Trips.belongsTo(models.Accomodation,{foreignKey:'accomodationId'})
      models.Accomodation.hasMany(models.Trips,{foreignKey:'accomodationId'});
      Trips.belongsTo(models.Users,{foreignKey:'userId'})
      models.Users.hasMany(models.Trips,{foreignKey: 'userId'});
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
      userId:{
        type: DataTypes.UUID,
        allowNull: false,
      },
      accomodationId:{
        type:DataTypes.INTEGER,
        allowNull: false,
      },
      departure: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destination: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
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