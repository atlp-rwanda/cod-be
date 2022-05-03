/* eslint-disable import/prefer-default-export */
import * as userSchema from './userValidation';
import tripSchema from './tripValidation';
import approveRequestSchema from './approveRequestValidation';
import { feedbackSchema, accomodationIdSchema } from './feedbackValidation';
import {
  roomSchema,
  updatedRoomSchema,
  bookingSchema,
  checkInorCheckoutSchema
} from './bookingValidation';
import { chatMessageSchema } from './chatMessage';
import { staticsValidate, periodValidate } from './statisticsValidation';

export {
  userSchema,
  tripSchema,
  feedbackSchema,
  accomodationIdSchema,
  approveRequestSchema,
  roomSchema,
  updatedRoomSchema,
  bookingSchema,
  checkInorCheckoutSchema,
  chatMessageSchema,
  staticsValidate,
  periodValidate
};
