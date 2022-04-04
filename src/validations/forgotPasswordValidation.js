/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

const forgotPassword = Joi.object().keys({
  email: Joi.string()
    .email()
    .lowercase()
    .required()
    .label('Email is required,lowercase and valid')
});
export { forgotPassword };
