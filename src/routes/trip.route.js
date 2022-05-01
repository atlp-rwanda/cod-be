/* eslint-disable import/named */
import express from 'express';
import {
  tripController,
  tripStatController,
  tripProfileController
} from '../controllers';
import { validate, errorHandler, isLoggedIn } from '../middlewares';
import * as auth from '../middlewares/authorize';
import {
  tripSchema,
  approveRequestSchema,
  staticsValidate,
  periodValidate
} from '../validations';
import queryValidate from '../middlewares/queryValidate';

const tripRouter = express.Router();

tripRouter.post(
  '/',
  validate(tripSchema),
  isLoggedIn,
  errorHandler(tripController.makeTripRequest)
);

tripRouter.get('/', isLoggedIn, errorHandler(tripController.getAllTripRequest));
tripRouter.get(
  '/statistics',
  queryValidate(staticsValidate),
  isLoggedIn,
  errorHandler(tripStatController.tripStatistics)
);
tripRouter.get(
  '/statistics/recent',
  queryValidate(periodValidate),
  isLoggedIn,
  errorHandler(tripStatController.recentTripStatistic)
);

tripRouter.get(
  '/:id',
  isLoggedIn,
  errorHandler(tripController.getOneTripRequest)
);

tripRouter.get(
  '/profile/info',
  isLoggedIn,
  errorHandler(tripProfileController.getTripProfileInfo)
);

tripRouter.delete(
  '/:id',
  isLoggedIn,
  errorHandler(tripController.deleteTripRequest)
);

tripRouter.put(
  '/:id',
  isLoggedIn,
  errorHandler(tripController.updateTripRequest)
);

tripRouter.patch(
  '/approve_reject/:id',
  isLoggedIn,
  auth.isManagerUser,
  validate(approveRequestSchema),
  errorHandler(tripController.approveOrRejectTripRequest)
);

export default tripRouter;
