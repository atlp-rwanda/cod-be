/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

const locationSchema = Joi.string()
  .min(3)
  .required()
  .label('Location of accomodation');

const newAccomodation = Joi.object().keys({
  name: Joi.string().required().label('Accomodation name is required'),
  description: Joi.string().required().min(5).label('Description is required'),
  location: Joi.alternatives()
    .try(locationSchema, Joi.array().min(2).unique().items(locationSchema))
    .required()
    .messages({
      'array.unique': 'The Location array contains duplicate items',
      'any.required': 'Location of accomodation is required'
    }),
  latitude: Joi.string().required().label('Latitude is required'),
  longitude: Joi.string().required().label('Longitude name is required')
});

const newFacility = Joi.object().keys({
  name: Joi.string().required().label('Facility name is required'),
  description: Joi.string().required().min(5).label('Description is required'),
  accomodation: Joi.number()
    .integer()
    .min(1)
    .label('Accomodation is required and must be valid')
});

const updateFacility = Joi.object().keys({
  name: Joi.string().required().label('Facility name is required'),
  description: Joi.string().required().min(5).label('Description is required'),
  accomodation: Joi.number()
    .integer()
    .min(1)
    .label('Accomodation is required and must be valid')
});

const newFacilityComponent = Joi.object().keys({
  facility: Joi.number()
    .required()
    .integer()
    .min(1)
    .label('Facility is required and must be valid'),
  description: Joi.string().required().min(5).label('Description is required'),
  image: Joi.string().required().label('Image path is required'),
  quantity: Joi.number()
    .required()
    .integer()
    .min(1)
    .label('Quantity is should be a valid number not zero'),
  price: Joi.string().required().label('Price is required'),
  allowBooking: Joi.string()
    .required()
    .valid('true', 'false')
    .required()
    .label('Please add booking status, either true or false')
});

const updateComponent = Joi.object().keys({
  facility: Joi.number()
    .integer()
    .min(1)
    .label('Facility is required and must be valid'),
  description: Joi.string().min(5).label('Description is required'),
  image: Joi.string().required().label('Image path is required'),
  quantity: Joi.number()
    .integer()
    .min(1)
    .label('Quantity is should be a valid number not zero'),
  price: Joi.string().required().label('Price is required'),
  allowBooking: Joi.string()
    .valid('true', 'false')
    .label('Please add booking status, either true or false')
});

const updateAccomodation = Joi.object().keys({
  name: Joi.string().label('Accomodation name is required'),
  description: Joi.string().min(5).label('Description is required'),
  location: Joi.string().label('Location name is required'),
  latitude: Joi.string().label('Latitude is required'),
  longitude: Joi.string().label('Longitude name is required')
});

export {
  newAccomodation,
  newFacility,
  newFacilityComponent,
  updateComponent,
  updateAccomodation,
  updateFacility
};
