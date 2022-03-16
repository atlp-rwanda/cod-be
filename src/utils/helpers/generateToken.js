/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const jwtToken = process.env.JWT_KEY;

const generateAccessToken=async (paramsObject) =>{ 
    const token=jwt.sign(paramsObject, jwtToken, { expiresIn: '1h' });
    return token;
}

export {generateAccessToken}