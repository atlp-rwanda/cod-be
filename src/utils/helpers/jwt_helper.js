/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import * as ApplicationError from '../errors/applicationsErrors';

dotenv.config();
const tokenSecret = process.env.JWT_KEY;

const verifyResetToken = (req, res, next) => {
  const resetToken = req.query.token;
  jwt.verify(resetToken, tokenSecret, (err, payload) => {
    if (err) {
      const message =
        err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
      res.status(401).json({
        status: 401,
        data: {
          Message: { Error: message }
        }
      });
      throw new Error(ApplicationError.AuthorizationError(message, res));
    }
    req.payload = payload;
    next();
  });
};

export { verifyResetToken };
