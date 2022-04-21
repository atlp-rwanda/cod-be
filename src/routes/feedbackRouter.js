import express from 'express';
import { addFeedback, getFeedbacks } from '../controllers/feedbackController';
import { errorHandler, isLoggedIn, validate } from '../middlewares';
import { feedbackSchema, accomodationIdSchema } from '../validations';
import paramsValidate from '../middlewares/paramsValidate';

const feedbackRouter = express.Router();

feedbackRouter.post(
  '/v1/accommodations/:accomodationId/feedback',
  paramsValidate(accomodationIdSchema),
  validate(feedbackSchema),
  isLoggedIn,
  errorHandler(addFeedback)
);
feedbackRouter.get(
  '/v1/accommodations/:accomodationId/feedback',
  errorHandler(getFeedbacks)
);

export default feedbackRouter;
