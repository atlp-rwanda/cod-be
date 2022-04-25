/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as userSchema from './userValidation';
import tripSchema from './tripValidation';
import approveRequestSchema from './approveRequestValidation';
import { feedbackSchema, accomodationIdSchema } from './feedbackValidation';
import {notificationSchema } from '../validation/notificationValidation';

export {
  userSchema,
  tripSchema,
  feedbackSchema,
  accomodationIdSchema,
  approveRequestSchema,
  notificationSchema,
};
