import * as ApplicationError from '../utils/errors/applicationsErrors';
import { successResponse } from '../utils/responseHandler';
import {
  readNotification,
  getNotification,
  getAllNotification,
  readAllNotification
} from '../services/notificationService';

const markNotification = async (req, res) => {
  try {
    const userId = req.user.id;
    const { notificationId } = req.params;
    const notification = await getNotification(userId, notificationId);
    if (!notification) {
      return ApplicationError.notFoundError('Notification not found', res);
    }
    if (!notification.isRead) {
      readNotification(notification, true);
      return successResponse(res, 200, 'The notification was marked as read');
    }
    readNotification(notification, false);
    return successResponse(res, 200, 'The notification was marked as unread');
  } catch (error) {
    ApplicationError.internalServerError(error, res);
  }
};
const markAllNotification = async (req, res) => {
  try {
    const userId = req.user.id;
    const { read } = req.query;
    const notifications = await getAllNotification(userId, read);
    if (!notifications.length) {
      if (read) {
        readAllNotification(notifications, true);
        return successResponse(
          res,
          200,
          'All notifications were marked as read'
        );
      }
      readAllNotification(notifications, false);
      return successResponse(
        res,
        200,
        'All notifications were marked as unread'
      );
    }
    return ApplicationError.notFoundError('Notifications not found', res);
  } catch (error) {
    ApplicationError.internalServerError(error, res);
  }
};

export { markNotification, markAllNotification };
