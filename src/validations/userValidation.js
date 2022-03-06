/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

const registerSchema = Joi.object().keys({
  firstname: Joi.string().required().label('Firstname is required'),
  lastname: Joi.string().required().label('Lastname is required'),
  email: Joi.string()
    .email()
    .lowercase()
    .required()
    .label('Email is required,lowercase and valid'),
  rolename: Joi.number().integer().min(1).max(1),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required()
    .label(
      'Password:eight characters, at least one letter, one number and one special character'
    )
});
export { registerSchema };
