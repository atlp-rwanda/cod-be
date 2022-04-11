import express from 'express';
import { tripController } from '../controllers';
import { validate, errorHandler, isLoggedIn } from '../middlewares';
import tripSchema from '../validations/tripValidation';

const tripRouter = express.Router();

tripRouter.post(
  '/',
  validate(tripSchema),
  isLoggedIn,
  errorHandler(tripController.makeTripRequest)
);

tripRouter.get('/', isLoggedIn, errorHandler(tripController.getAllTripRequest));

tripRouter.get(
  '/:id',
  isLoggedIn,
  errorHandler(tripController.getOneTripRequest)
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

export default tripRouter;
