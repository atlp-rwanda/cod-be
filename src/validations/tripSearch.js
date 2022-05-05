/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

const tripSearch = Joi.object().keys({
  name: Joi.string().min(1).label('Enter a value to search by name'),
  email: Joi.string().min(1).label('Enter a value to search by email'),
  destination: Joi.string()
    .min(1)
    .label('Enter a value to search by destination'),
  departure: Joi.string().min(1).label('Enter a value to search by departure'),
  duration: Joi.number().integer().min(1).label('Duration should be a number'),
  startDate: Joi.date().label('This should be a valid date'),
  currentStatus: Joi.string().min(1).label('Enter a value to search by status')
});

export { tripSearch };
