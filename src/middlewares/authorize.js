/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import * as isAuthorized from '../utils/errors/authorizationError';
import * as notFound from '../utils/errors/notFoundError';
import { isAdmin, isSuperAdmin as superUser } from '../services/rolesService';
import { Users } from '../database/models';
import {
  AuthorizationError,
  internalServerError
} from '../utils/errors/applicationsErrors';

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
        const { email } = decoded;
        const { id } = decoded;
        if (email != null && id != null) {
          const valid = { email, id };
          req.valid = valid;
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

const adminUser = async (req, res, next) => {
  const check = await isAdmin(req.user.email, req.user.id);
  if (check) {
    next();
  } else {
    isAuthorized.isNotAuthorized('Access denied', res);
  }
};
const superAdmin = async (req, res, next) => {
  const check = await superUser(req.valid.email, req.valid.id);
  if (check) {
    next();
  } else {
    isAuthorized.isNotAuthorized('Access denied', res);
  }
};
const isRequester = async (req, res, next) => {
  try {
    const user = await Users.findOne({ where: { id: req.user.id } });
    if (user.roleId !== 4) {
      return AuthorizationError('You are not a requester', res);
    }
    next();
  } catch (error) {
    return internalServerError('Error occured', res);
  }
};

export { isSuperAdmin, adminUser, superAdmin, isRequester };
