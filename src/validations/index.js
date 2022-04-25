/* eslint-disable import/prefer-default-export */
import * as userSchema from './userValidation';
import tripSchema from './tripValidation';
import approveRequestSchema from './approveRequestValidation';
import { feedbackSchema, accomodationIdSchema } from './feedbackValidation';

export {
  userSchema,
  tripSchema,
  feedbackSchema,
  accomodationIdSchema,
  approveRequestSchema
};
