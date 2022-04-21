/**
 * Export all middleware files here
 */

import validate from './validate';
import errorHandler from './catchError';
import isLoggedIn from './authenticate';

export { validate, errorHandler, isLoggedIn };
