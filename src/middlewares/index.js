/**
 * Export all middleware files here
 */

import validate from './validate';
import errorHandler from './catchError';
import isLoggedIn from './authenticate';
import { authorizeCommenter } from './authorize';

export { validate, errorHandler, isLoggedIn, authorizeCommenter };
