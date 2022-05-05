import express from 'express';
import * as tripSearch from '../controllers/tripRequestsSearchController';
import * as validate from '../middlewares/searchParamsValidate';
import isLoggedIn from '../middlewares/authenticate';
import { authorizeTripSearch } from '../middlewares/authorize';

const tripSearchRouter = express.Router();
tripSearchRouter.get(
  '/v1/trip/search/byKey',
  isLoggedIn,
  authorizeTripSearch,
  validate.search,
  tripSearch.tripRequestSearch
);

export default tripSearchRouter;
