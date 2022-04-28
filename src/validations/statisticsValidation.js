/* eslint-disable import/prefer-default-export */
import DateExtension from '@joi/date';
import * as JoiImport from 'joi';

const Joi = JoiImport.extend(DateExtension);

const staticsValidate = Joi.object().keys({
  start: Joi.date()
    .utc('javascript')
    .max('now')
    .label('Starting date')
    .messages({
      'date.max': 'starting date must be less than or equal to today'
    }),
  end: Joi.date()
    .utc('javascript')
    .min(Joi.ref('start'))
    .max('now')
    .label('Ending date')
    .messages({
      'date.min': `The ending date must be greater than starting date`,
      'date.max': 'ending date must be less than or equal to today'
    })
});
const periodValidate = Joi.object().keys({
  period: Joi.string()
    .required()
    .label('Period must be valid. Day,Week,Month,Year'),

  number: Joi.number()
    .min(1)
    .label('Number of periods must be a positive integer')
});
export { staticsValidate, periodValidate };
