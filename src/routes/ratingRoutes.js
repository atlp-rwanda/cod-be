import express from 'express';
import isLoggedIn from '../middlewares/authenticate';
import { isRequester } from '../middlewares/authorize';
import paramsValidate from '../middlewares/paramsValidate';
import { accomodationIdSchema } from '../validations/idValidation';
import validate from '../middlewares/validate';
import { ratingSchema } from '../validations/ratingValidation';
import {
  addRating,
  allRatings,
  getRatings
} from '../controllers/ratingController';

const ratingRouter = express.Router();
ratingRouter.post(
  '/v1/accommodations/:accomodation_id/rating',
  paramsValidate(accomodationIdSchema),
  isLoggedIn,
  isRequester,
  validate(ratingSchema),
  addRating
);

ratingRouter.get(
  '/v1/accommodations/:accomodation_id/rating',
  paramsValidate(accomodationIdSchema),
  allRatings
);

ratingRouter.get(
  '/v1/accommodations/:accomodation_id/getratings',
  paramsValidate(accomodationIdSchema),
  getRatings
);

export default ratingRouter;
