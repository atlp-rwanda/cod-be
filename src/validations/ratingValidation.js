/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

const ratingSchema = Joi.object().keys({
  serviceRating: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required()
    .label('service rate must be an integer between 1 and 5.')
});
export { ratingSchema };
