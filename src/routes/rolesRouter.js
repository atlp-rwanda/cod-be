import express from 'express';
import * as Role from '../controllers/roleController';
import * as auth from '../middlewares/authorize';

const roleRouter = express.Router();
roleRouter.patch(
  '/v1/users/assignRole',
  auth.isSuperAdmin,
  (req, res, next) => {
    try {
      Role.default.getRoleId(req, res);
    } catch (error) {
      res.status(500).json('An error has occured, try again!');
      next(error);
    }
  }
);
export default roleRouter;
