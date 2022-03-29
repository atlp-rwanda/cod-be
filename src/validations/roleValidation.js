/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

const assignRole = Joi.object().keys({
  rolename: Joi.string().required().label('Role name is required'),
  user: Joi.string().required().label('User Id is required')
});
export { assignRole };
