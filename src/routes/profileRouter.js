/* eslint-disable prefer-destructuring */
import express from 'express';
import * as profileControl from '../controllers/profileController';
import isLoggedIn from '../middlewares/authenticate';

const profileRouter = express.Router();

profileRouter.put('/user/profile/:userId', isLoggedIn, (req, res, next) => {
  const userId = req.params.userId;
  try {
    profileControl.default.updateProfile(userId, req.body, res, next);
  } catch (error) {
    res.status(500).json({
      'Error Message:': 'An Error Has Occured, Try Again!',
      Error: error
    });
    next(error);
  }
});

profileRouter.get('/user/profile/:userId', (req, res, next) => {
  const userId = req.params.userId;
  try {
    profileControl.default.getProfile(userId, res, next);
  } catch (error) {
    res.status(500).json({
      'Error Message:': 'An Error Has Occured, Try Again!',
      Error: error
    });
    next(error);
  }
});
export default profileRouter;
