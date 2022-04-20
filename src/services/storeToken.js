/* eslint-disable no-param-reassign */
import { LoggedInUser } from '../database/models';
import {
  generateAccessToken,
  generateRefreshToken,
  decodeRefreshToken
} from '../utils/helpers/generateToken';
import { updateOrCreate } from './userService';

const storeToken = async (user = null, token = null) => {
  //  This get the logged in user as parameter then return its json web token
  if (token) {
    const refreshTokenExist = await LoggedInUser.findOne({
      where: { refreshToken: token }
    }); // Find if refresh token already in the db
    if (!refreshTokenExist) {
      return null;
    }
    user = await decodeRefreshToken(token);
    await LoggedInUser.destroy({ where: { refreshToken: token } }); // delete the current refresh from db
  }

  try {
    const userData = {
      id: user.id,
      email: user.email
    };
    const accessToken = await generateAccessToken(userData);
    const refreshToken = await generateRefreshToken(userData);

    await updateOrCreate(
      LoggedInUser,
      { user_id: userData.id },
      { user_id: userData.id, refreshToken }
    ); // update or create refresh token into db
    return { accessToken, refreshToken };
  } catch (error) {
    return error.message;
  }
};

export default storeToken;
