/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

const chatMessageSchema = Joi.object().keys({
  message: Joi.string().min(1).max(500).required().label('Chat message')
});
export { chatMessageSchema };
