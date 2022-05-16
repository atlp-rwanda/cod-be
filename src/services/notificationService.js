import models from '../database/models';
import { getNotifications } from '../utils/helpers/notifications';

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
const getById = async (id) => {
  const foundItem = await Notification.findOne({ where: { id: `${id}` } });
  if (!foundItem) {
    return null;
  }
  return foundItem;
};

const allNotifications = async (user) => {
  const found = await getNotifications(user);
  return found;
};

const checkIfBlocked = async (where) => {
  const foundItem = await UserNotification.findOne({ where });
  if (!foundItem) {
    return false;
  }
  return true;
};
const markNotification = async (notification) => {
  notification.isRead = true;
  await notification.save();
};
export {
  addTripStatusNotification,
  addTripCommentNotification,
  addNotificationsStatus,
  allNotifications,
  checkIfBlocked,
  getById,
  markNotification
};
