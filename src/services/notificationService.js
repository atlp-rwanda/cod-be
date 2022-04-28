import models from '../database/models';

const { Notification, UserNotification } = models;
const addTripStatusNotification = async (notification) => {
  const addNotification = await Notification.create(notification);
  return addNotification;
};
const addTripCommentNotification = async (notification) => {
  const addNotification = await Notification.create(notification);
  return addNotification;
};
const addNotificationsStatus = async (notification) => {
  const where = { userId: notification.userId, type: notification.type };
  const foundItem = await UserNotification.findOne({ where });
  if (!foundItem) {
    const item = await UserNotification.create(notification);
    return { item, created: true };
  }
  const item = await UserNotification.update(
    { isAllowed: notification.isAllowed },
    { where }
  );
  return { item, created: false };
};
export {
  addTripStatusNotification,
  addTripCommentNotification,
  addNotificationsStatus
};
