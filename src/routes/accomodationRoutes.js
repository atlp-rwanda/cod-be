import express from 'express';
import { Accomodation, destinationController } from '../controllers';
import { accomodationIdSchema } from '../validations';
import {
  isLoggedIn,
  authorizeCommenter as adminUser,
  validateAccommodation,
  errorHandler,
  paramsValidate
} from '../middlewares';

const accomodationRouter = express.Router();

accomodationRouter.post(
  '/v1/accommodations/register',
  isLoggedIn,
  adminUser,
  validateAccommodation.addAccomodation,
  Accomodation.newEntry
);
accomodationRouter.get(
  '/v1/accommodations/destinationStats',
  isLoggedIn,
  errorHandler(destinationController.getAllDestinationStats)
);

accomodationRouter.get(
  '/v1/accommodations',
  isLoggedIn,
  adminUser,
  Accomodation.getAll
);

accomodationRouter.get(
  '/v1/accommodations/:Id',
  isLoggedIn,
  adminUser,
  Accomodation.getById
);

accomodationRouter.get(
  '/v1/accommodations/:accomodationId/destinationStats',
  paramsValidate(accomodationIdSchema),
  isLoggedIn,
  errorHandler(destinationController.getAccommodationDestinationStats)
);

accomodationRouter.patch(
  '/v1/accommodations/update/:Id',
  isLoggedIn,
  adminUser,
  validateAccommodation.updateAccomodation,
  Accomodation.doUpdate
);

accomodationRouter.delete(
  '/v1/accommodations/remove/:Id',
  isLoggedIn,
  adminUser,
  Accomodation.doDelete
);

export default accomodationRouter;
