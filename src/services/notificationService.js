import { Notification } from "../database/models";

const getNotification = async (notificationId, userId) =>{
    const notification = await Notification.findOne({where: {id:notificationId, userId}});
    return notification;
}
const readNotification = async (notification, status) =>{
    notification.isRead = status;
    await notification.save();
}
const getAllNotification = async (userId) =>{
    const notifications = await Notification.findAll({where: {userId}});
    return notifications;
}
const readAllNotification = async (notifications, status) =>{
    notifications.forEach(notification=>{notification.isRead=status});
    await notifications.save();
}
export {getNotification, readNotification, getAllNotification, readAllNotification};
