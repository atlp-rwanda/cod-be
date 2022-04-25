/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express from 'express';
import isLoggedIn from '../middlewares/authenticate';
import paramsValidate from '../middlewares/paramsValidate';
import {notificationSchema } from '../validation';
import { markNotification, markAllNotification } from '../controllers/notificationController';

const notificationRouter = express.Router();
notificationRouter.post(
  '/v1/notification/mark/:notificationId',
  isLoggedIn,
  paramsValidate(notificationSchema),
  markNotification
);

notificationRouter.get(
    '/v1/notification/mark',
    isLoggedIn,
  markAllNotification
);


export default notificationRouter;
