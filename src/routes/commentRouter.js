import express from 'express';
import {
  addComment,
  deleteComment,
  getComments
} from '../controllers/commentController';
import {
  authorizeCommenter,
  errorHandler,
  isLoggedIn,
  validate
} from '../middlewares';
import { validateComment } from '../validations/commentValidation';

const commentRouter = express.Router();

commentRouter.post(
  '/trip/:tripId/comment',
  validate(validateComment),
  isLoggedIn,
  authorizeCommenter,
  errorHandler(addComment)
);
commentRouter.get(
  '/trip/:tripId/comment',
  isLoggedIn,
  authorizeCommenter,
  errorHandler(getComments)
);
commentRouter.delete(
  '/trip/comment/:commentId',
  isLoggedIn,
  authorizeCommenter,
  errorHandler(deleteComment)
);

export default commentRouter;
