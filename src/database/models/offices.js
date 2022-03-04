'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class offices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  offices.init({
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    address: DataTypes.STRING,
    office_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'offices',
  });
  return offices;
};