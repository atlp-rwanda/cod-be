import * as ApplicationError from '../utils/errors/applicationsErrors';
import { tripService, roleService } from '../services';
import {
  notFoundResponse,
  successResponse,
  createdResponse
} from '../utils/responseHandler';

export const makeTripRequest = async (req, res) => {
  const {
    departure,
    destination,
    dateOfTravel,
    dateOfReturn,
    travelReason,
    accomodationId
  } = req.body;
  const newTripRequest = {
    departure,
    destination,
    dateOfTravel,
    dateOfReturn,
    travelReason,
    accomodationId,
    userId: req.user.id
  };
  const trip =
    typeof destination === 'string'
      ? await tripService.createTripRequest(newTripRequest)
      : await tripService.createMulticityTripRequest(newTripRequest);

  if (trip) {
    createdResponse(res, 'New trip request made successfully', trip);
  } else {
    ApplicationError.internalServerError(
      `There was a problem making your trip request`,
      res
    );
  }
};

export const getAllTripRequest = async (req, res) => {
  if ((await roleService.getUserRole(req.user.id)) === 'Manager') {
    const { trips, error } = await tripService.findTripByManagerId(req.user.id);
    if (error) return ApplicationError.internalServerError(error, res);
    successResponse(
      res,
      200,
      'All trip requests to your Accomodation fetched successfully',
      trips
    );
  } else if ((await roleService.getUserRole(req.user.id)) === 'Requester') {
    const { trips, error } = await tripService.findTripByUserId(req.user.id);
    if (error) return ApplicationError.internalServerError(error, res);
    successResponse(
      res,
      200,
      'All your trip requests fetched successfully',
      trips
    );
  } else {
    const { trips, error } = await tripService.findAllTripRequest(req.user.id);
    if (error) return ApplicationError.internalServerError(error, res);
    successResponse(res, 200, 'All trip requests fetched successfully', trips);
  }
};

export const getOneTripRequest = async (req, res) => {
  const { trip, error } = await tripService.findTripById(req.params.id);
  if (error) return ApplicationError.internalServerError(error, res);
  if (trip === null) return notFoundResponse(res, 'Trip not found');
  successResponse(res, 200, 'One trip request fetched successfully', trip);
};

export const deleteTripRequest = async (req, res) => {
  const { trip } = await tripService.findTripById(req.params.id);
  if (trip === null) return notFoundResponse(res, 'Trip not found');
  if (trip && trip.userId === req.user.id && trip.status === 'pending') {
    const { error } = await tripService.deleteTripRequest(req.params.id);
    if (error) return ApplicationError.internalServerError(error, res);
    successResponse(res, 202, 'Trip request deleted successfully');
  } else {
    ApplicationError.AuthorizationError(
      `Not allowed to delete this trip request`,
      res
    );
  }
};

export const updateTripRequest = async (req, res) => {
  const { trip } = await tripService.findTripById(req.params.id);
  if (trip === null) return notFoundResponse(res, 'Trip not found');
  if (trip && trip.userId === req.user.id && trip.status === 'pending') {
    const { error } = await tripService.updateTrip(req.params.id, req.body);
    if (error) return ApplicationError.internalServerError(error, res);
    successResponse(res, 200, 'Trip request updated successfully');
  } else {
    ApplicationError.AuthorizationError(
      `Not allowed to edit this trip request`,
      res
    );
  }
};
