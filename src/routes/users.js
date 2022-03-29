/* eslint-disable no-unused-vars */
import express from 'express';
import  * as userControl from '../controllers/userController';
import isLoggedIn from "../middlewares/authenticate"

const userRouter = express.Router();

userRouter.post('/user/register', (req, res, next) => {
  try {
    const appUrl = req.headers.host;
    userControl.default.registerNew(req.body, res, appUrl);
  } catch (error) {
    res
      .status(500)
      .json({
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
        userControl.default.logout(req,res);
    } catch (error) {
        res.status(500).json({Error: error.message, status:500 });
        next(error);        
    }  
});
export default userRouter;
