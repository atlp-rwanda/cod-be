import DateExtension from '@joi/date';
import * as JoiImport from 'joi';

const Joi = JoiImport.extend(DateExtension);
const destinationSchema = Joi.string()
  .min(3)
  .required()
  .label('Place of destination');
  
const tripSchema = Joi.object().keys({
  departure: Joi.string().min(3).required().label('Place of departure'),
  destination: Joi.alternatives().try(
    destinationSchema,
    Joi.array().min(2).unique().items(destinationSchema).messages({
      'array.unique': 'The destination array contains duplicate items'
    })
  ),
  dateOfTravel: Joi.date()
    .utc('javascript')
    .min('now')
    .required()
    .label('Date of travel'),
  dateOfReturn: Joi.date()
    .utc()
    .greater(Joi.ref('dateOfTravel'))
    .label('Date of Return')
    .messages({
      'date.greater': `"Date of return" should be greater than "Date of travel"`
    }),
  travelReason: Joi.string().min(5).required().label('Reason for travel'),
  accomodationId: Joi.number().required().label('Accomodation')
});

export default tripSchema;
