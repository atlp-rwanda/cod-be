/**
 * start your validations logic here
 * you can create more validation files and export them using index
 */
/* eslint-disable import/prefer-default-export */
import * as userSchema from './userValidation';
import tripSchema from './tripValidation';
import { feedbackSchema, accomodationIdSchema } from './feedbackValidation';

export { userSchema, tripSchema, feedbackSchema, accomodationIdSchema };
