import DateExtension from '@joi/date';
import * as JoiImport from 'joi';

const Joi = JoiImport.extend(DateExtension);
const tripSchema = Joi.object().keys({
  departure: Joi.string().min(3).required().label('Place of departure'),
  destination: Joi.string().min(3).required().label('Place of destination'),
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
