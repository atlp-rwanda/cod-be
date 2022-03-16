import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const jwtToken = process.env.JWT_KEY;

const generateAccessToken=async (paramsObject) =>{ 
    return jwt.sign(paramsObject, jwtToken, { expiresIn: '1h' });
}

export {generateAccessToken}