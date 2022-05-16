/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

const validateType = Joi.object().keys({
  type: Joi.string()
    .min(1)
    .valid('email', 'application')
    .label('Type')
    .messages({
      Type: 'Give a valid notification type (email or application)'
    }),
  status: Joi.required()
    .valid('false', 'true')
    .label('Status')
    .messages({ Type: 'Give a valid notification status(true or false)' })
});
const validateParameter = Joi.object().keys({
  Id: Joi.string().guid().min(4).label('Id').messages({
    Type: 'Give a valid notification Id)'
  })
});
export { validateType, validateParameter };
