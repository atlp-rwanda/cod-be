/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const jwtToken = process.env.JWT_KEY;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;

const generateAccessToken = async (paramsObject) => {
  const token = jwt.sign(paramsObject, jwtToken, { expiresIn: '1h' });
  return token;
};
const generateRefreshToken = async (paramsObject) => {
  try {
    const token = jwt.sign(paramsObject, refreshTokenKey, { expiresIn: '1d' });
    return token;
  } catch (error) {
    return null;
  }
};
const decodeAccessToken = async (accessToken) => {
  try {
    const decodedToken = await jwt.verify(accessToken, jwtToken);
    return decodedToken;
  } catch (error) {
    return null;
  }
};
const decodeRefreshToken = async (refreshToken) => {
  try {
    const decodedToken = await jwt.verify(refreshToken, refreshTokenKey);
    return decodedToken;
  } catch (error) {
    return null;
  }
};
const generateResetToken = async (paramsObject) => {
  const token = jwt.sign(paramsObject, jwtToken, { expiresIn: '15m' });
  return token;
};

export {
  generateAccessToken,
  generateRefreshToken,
  decodeAccessToken,
  decodeRefreshToken,
  generateResetToken
};
