/**
 * Export all middleware files here
 */

import validate from './validate';
import errorHandler from './catchError';
import isLoggedIn from './authenticate';
import { authorizeCommenter } from './authorize';
import * as validateAccommodation from './validateInputs';
import paramsValidate from './paramsValidate';

export {
  validate,
  errorHandler,
  isLoggedIn,
  authorizeCommenter,
  paramsValidate,
  validateAccommodation
};
