/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class LoggedInUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  LoggedInUser.init(
    {
      refreshToken: { type: DataTypes.TEXT, allowNull: false },
      user_id: { type: DataTypes.STRING, unique: true, allowNull: false }
    },
    {
      sequelize,
      modelName: 'LoggedInUser',
      tableName: 'LoggedInUsers'
    }
  );
  return LoggedInUser;
};
