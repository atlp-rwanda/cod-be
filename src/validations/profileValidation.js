/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

const createProfile = Joi.object().keys({
  gender: Joi.string()
    .valid('male', 'female', 'Female', 'Male')
    .required()
    .label('Gender should be either male or female'),
  language: Joi.string().min(3).required().label('Enter your language'),
  location: Joi.string().min(3).required().label('Enter your Location'),
  birthdate: Joi.date()
    .raw()
    .required()
    .label('Birdate Date format YYYY-MM-DD'),
  currency: Joi.string().min(3).required().label('choose your currency'),
  departement: Joi.string().min(3).required().label('choose your departement'),
  manager: Joi.string().min(3).required().label('Check Manager')
});

export { createProfile };
