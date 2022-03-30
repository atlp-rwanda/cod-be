/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

const validateComment = Joi.object().keys({
  comment: Joi.string().required().label('a Comment required')
});
export { validateComment };
