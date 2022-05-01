import DateExtension from '@joi/date';
import * as JoiImport from 'joi';
import { getAccommodationLocations } from '../services/accomodationService';

const Joi = JoiImport.extend(DateExtension);
const destinationSchema = Joi.string()
  .min(3)
  .required()
  .label('Place of destination');

const tripSchema = Joi.object().keys({
  departure: Joi.string().min(3).required().label('Place of departure'),
  destination: Joi.alternatives()
    .try(
      destinationSchema,
      Joi.array().min(2).unique().items(destinationSchema)
    )
    .required()
    .messages({
      'array.unique': 'The destination array contains duplicate items',
      'any.required': 'Place of destination is required'
    }),
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
  accomodationId: Joi.number().required().label('Accomodation'),
  saveInfo: Joi.boolean()
    .default(false)
    .messages({ boolean: 'saveInfo must be boolean' })
});

export const validateDestination = async (trip) => {
  const validLocations = await getAccommodationLocations(trip.accomodationId);
  if (validLocations === undefined) {
    return {
      error: "The accommodation don't have any locations or doesn't exist"
    };
  }
  const { error } = Joi.object()
    .keys({
      destination: Joi.array().items(Joi.string().valid(...validLocations))
    })
    .messages({
      'any.only': `Destinations must be one of Accommodation locations:${validLocations}`
    })
    .validate({ destination: trip.destination });
  if (error) {
    return { error };
  }
  return { error: false };
};

export default tripSchema;
