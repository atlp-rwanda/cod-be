/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

const notificationIdSchema = Joi.object().keys({
  notificationId: Joi.number()
    .integer()
    .min(1)
    .required()
    .label('Notification id should be valid.')
});
export { notificationIdSchema };