/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

const validateComment = Joi.object().keys({
  comment: Joi.string().min(2).required().label('Enter valid comment')
});
export { validateComment };
