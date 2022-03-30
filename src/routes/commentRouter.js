import express from 'express';
import {addComment, deleteComment, getComments} from '../controllers/commentController';
import errorHandler  from '../middlewares/catchError';
import isLoggedIn from '../middlewares/authenticate';
import validate from '../middlewares/validate';
import { validateComment } from '../validations/commentValidation';

const commentRouter = express.Router();

commentRouter.post(
  '/trip/:tripId/comment',
  validate(validateComment),
  isLoggedIn,
  errorHandler(addComment)
);
commentRouter.get(
  '/trip/:tripId/comment',
  errorHandler(getComments)
);
commentRouter.delete(
  '/trip/comment/:commentId',
  isLoggedIn,
  errorHandler(deleteComment)
);

export default commentRouter;
