/* eslint-disable no-console */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
import express from 'express';
import * as userControl from '../controllers/userController';
import * as verifyPasswordToken from '../utils/helpers/jwt_helper';
import { errorHandler, isLoggedIn } from '../middlewares';
import { superAdmin, adminUser } from '../middlewares/authorize';
import { userController } from '../controllers';

const userRouter = express.Router();

userRouter.post('/user/register', (req, res, next) => {
  try {
    const appUrl = req.headers.host;
    userControl.default.registerNew(req.body, res, appUrl);
  } catch (error) {
    res.status(500).json({
      'Error Message:': 'An Error Has Occured, Try Again!',
      Error: error
    });
    next(error);
  }
});

userRouter.get('/verify-user', async (req, res, next) => {
  try {
    const emailToken = req.query.token;
    userControl.default.verifyUser(emailToken, res);
  } catch (error) {
    res.status(500).json({ 'Error:': error });
    next(error);
  }
});
userRouter.post('/user/login', async (req, res, next) => {
  try {
    userControl.default.login(req, res);
  } catch (error) {
    res.status(500).json({ 'Error:': error });
    next(error);
  }
});

userRouter.post('/user/refresh', async (req, res, next) => {
  try {
    userControl.default.refreshToken(req, res);
  } catch (error) {
    res.status(500).json({ 'Error:': error });
    next(error);
  }
});
userRouter.delete('/user/logout', isLoggedIn, async (req, res, next) => {
  try {
    userControl.default.logout(req, res);
  } catch (error) {
    res.status(500).json({ Error: error.message, status: 500 });
    next(error);
  }
});

userRouter.post('/v1/forgot-password', async (req, res, next) => {
  try {
    userControl.default.forgotPassword(req.body, res, next);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      Message: { Error: error }
    });
    next(error);
  }
});

userRouter.get('/v1/reset-password', async (req, res, next) => {
  try {
    const appUrl = req.headers.host;
    const emailToken = req.query.token;
    res.status(200).json({
      status: 200,
      data: {
        Message: `Send A PATCH Request to the link below to update your password`,
        Link: `http://${appUrl}/api/v1/reset-password?token=${emailToken}`
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      data: {
        Message: { Error: error }
      }
    });
    next(error);
  }
});

userRouter.patch(
  '/v1/reset-password',
  verifyPasswordToken.verifyResetToken,
  async (req, res, next) => {
    try {
      const emailToken = req.query.token;
      userControl.default.resetPassword(req.body, res, emailToken, next);
    } catch (error) {
      next(error);
    }
  }
);
userRouter.get('/users', isLoggedIn, superAdmin, async (req, res, next) => {
  try {
    userControl.default.getAllUsers(req, res, next);
  } catch (error) {
    res.status(500).json({ 'Error:': error });
    next(error);
  }
});
userRouter.get(
  '/v1/users/managers',
  isLoggedIn,
  adminUser,
  errorHandler(userController.getAllManagers)
);

export default userRouter;
