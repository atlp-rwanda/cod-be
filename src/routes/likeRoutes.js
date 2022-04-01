import express from 'express';
import paramsValidate from '../middlewares/paramsValidate';
import { accomodationIdSchema } from '../validations/idValidation';
import isLoggedIn from '../middlewares/authenticate';
import { isRequester } from '../middlewares/authorize';
import {
  like,
  disLike,
  allLikes,
  allDisLikes
} from '../controllers/likeController';

const likeRouter = express.Router();
likeRouter.post(
  '/v1/accomodation/:accomodation_id/like',
  paramsValidate(accomodationIdSchema),
  isLoggedIn,
  isRequester,
  like
);
likeRouter.post(
  '/v1/accomodation/:accomodation_id/dislike',
  paramsValidate(accomodationIdSchema),
  isLoggedIn,
  isRequester,
  disLike
);

likeRouter.get(
  '/v1/accomodation/:accomodation_id/like',
  paramsValidate(accomodationIdSchema),
  allLikes
);
likeRouter.get(
  '/v1/accomodation/:accomodation_id/dislike',
  paramsValidate(accomodationIdSchema),
  allDisLikes
);

export default likeRouter;
