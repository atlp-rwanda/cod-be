/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import * as isAuthorized from '../utils/errors/authorizationError';
import * as notFound from '../utils/errors/notFoundError';

dotenv.config();
const jwtToken = process.env.JWT_KEY;
const isSuperAdmin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      isAuthorized.isNotAuthenticated('Unauthenticated', res);
    }
    jwt.verify(token, jwtToken, (err, decoded) => {
      if (err) {
        isAuthorized.isNotAuthenticated('Unauthenticated', res);
      } else {
        const {email} = decoded;
        const {id} = decoded;
        if (email != null && id != null) {
          req.userEmail = email;
          req.userId = id;
          next();
        } else {
          notFound.isNotFound('Wrong authentication token', res);
        }
      }
    });
  } else {
    isAuthorized.isNotAuthenticated('Unauthenticated', res);
  }
};

export { isSuperAdmin };
