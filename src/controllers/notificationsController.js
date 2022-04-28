import { addNotificationsStatus } from '../services/notificationService';
import * as applicationError from '../utils/errors/applicationsErrors';
import { successResponse } from '../utils/responseHandler';

export const allowNofications = async (req, res) => {
  try {
    const { type } = req.body;
    const notification = {
      userId: req.user.id,
      type,
      isAllowed: true
    };
    const addNew = await addNotificationsStatus(notification);
    console.log(addNew);
    successResponse(res, 200, 'Notification status updated');
  } catch (error) {
    console.log(error);
    return applicationError.internalServerError(
      { data: { message: `Error: ${error} ,try again!` } },
      res
    );
  }
};
export const blockNotifications = async (req, res) => {
  try {
    const { type } = req.body;
    const notification = {
      userId: req.user.id,
      type,
      isAllowed: false
    };
    const addNew = await addNotificationsStatus(notification);
    console.log(addNew);
    successResponse(res, 200, 'Notification status updated');
  } catch (error) {
    console.log(error);
    return applicationError.internalServerError(
      { data: { message: `Error: ${error} ,try again!` } },
      res
    );
  }
};
