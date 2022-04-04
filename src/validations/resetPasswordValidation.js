/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

const resetPassword = Joi.object().keys({
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required()
    .label(
      'Password:eight characters, at least one letter, one number and one special character'
    )
});
export { resetPassword };
