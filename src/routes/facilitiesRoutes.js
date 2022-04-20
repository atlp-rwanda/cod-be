import express from 'express';
import * as validate from '../middlewares/validateInputs';
import * as facility from '../controllers/facilityController';
import isLoggedIn from '../middlewares/authenticate';
import { adminUser } from '../middlewares/authorize';

const facilityRouter = express.Router();
facilityRouter.post(
  '/v1/facilities/register',
  isLoggedIn,
  adminUser,
  validate.addfacility,
  facility.newfacilityEntry
);

facilityRouter.delete(
  '/v1/facilities/delete/:Id',
  isLoggedIn,
  adminUser,
  facility.doDelete
);

facilityRouter.get(
  '/v1/facilities/:Id',
  isLoggedIn,
  adminUser,
  facility.getById
);

facilityRouter.get(
  '/v1/facilities/all/:accomodationId',
  isLoggedIn,
  adminUser,
  facility.fetchAllInAccomodation
);

facilityRouter.patch(
  '/v1/facilities/update/:Id',
  isLoggedIn,
  adminUser,
  validate.updateFacility,
  facility.doUpdate
);

/**
 * Facility components routes
 */

facilityRouter.post(
  '/v1/facility/components',
  isLoggedIn,
  adminUser,
  validate.addFacilityComponent,
  facility.addFacilityComponent
);

facilityRouter.get(
  '/v1/facility/components/:facilityId',
  isLoggedIn,
  adminUser,
  facility.getAllcomponents
);

facilityRouter.patch(
  '/v1/facility/components/:componentId',
  isLoggedIn,
  adminUser,
  validate.updateFacilityComponent,
  facility.updateComponent
);

facilityRouter.delete(
  '/v1/facility/components/:componentId',
  isLoggedIn,
  adminUser,
  facility.deleteComponent
);

export default facilityRouter;
