/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

const validateType = Joi.object().keys({
  type: Joi.string()
    .min(1)
    .valid('email', 'application')
    .label(
      'Enter a type of notifications(email or application) to change its status'
    )
});

export { validateType };
