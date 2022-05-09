import express from 'express';
import {
  addNoficationStatus,
  getNotifications,
  getNotificationById
} from '../controllers/notificationsController';
import { validate, isLoggedIn, paramsValidate } from '../middlewares';
import { validateType, validateParameter } from '../validations/notifications';

const notificationsRouter = express.Router();
notificationsRouter.post(
  '/v1/notifications/status',
  isLoggedIn,
  validate(validateType),
  addNoficationStatus
);
notificationsRouter.get('/v1/notifications', isLoggedIn, getNotifications);

notificationsRouter.get(
  '/v1/:Id/notifications',
  isLoggedIn,
  paramsValidate(validateParameter),
  getNotificationById
);

export default notificationsRouter;
