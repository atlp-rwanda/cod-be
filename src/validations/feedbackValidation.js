/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

const feedbackSchema = Joi.object().keys({
  feedback: Joi.string().min(3).required().label('Feedback has to be valid')
});
const accomodationIdSchema = Joi.object().keys({
  accomodationId: Joi.number()
    .integer()
    .min(1)
    .required()
    .label('Accomodation id should be valid.')
});

export { feedbackSchema, accomodationIdSchema };
