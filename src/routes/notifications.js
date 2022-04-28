import express from 'express';
import {
  allowNofications,
  blockNotifications
} from '../controllers/notificationsController';
import { isValid } from '../middlewares/notificationValidate';
import isLoggedIn from '../middlewares/authenticate';

const notificationsRouter = express.Router();
notificationsRouter.post(
  '/v1/allow/notifications',
  isLoggedIn,
  isValid,
  allowNofications
);
notificationsRouter.post(
  '/v1/block/notifications',
  isLoggedIn,
  isValid,
  blockNotifications
);

export default notificationsRouter;
