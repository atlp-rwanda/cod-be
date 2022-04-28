/* eslint-disable import/prefer-default-export */
import * as userSchema from './userValidation';
import tripSchema from './tripValidation';
import approveRequestSchema from './approveRequestValidation';
import { feedbackSchema, accomodationIdSchema } from './feedbackValidation';
import { chatMessageSchema } from './chatMessage';
import { staticsValidate, periodValidate } from './statisticsValidation';

export {
  userSchema,
  tripSchema,
  feedbackSchema,
  accomodationIdSchema,
  approveRequestSchema,
  chatMessageSchema,
  staticsValidate,
  periodValidate
};
