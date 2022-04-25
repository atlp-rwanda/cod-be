import * as ApplicationError from '../utils/errors/applicationsErrors';
import { tripService, roleService } from '../services';
import * as accomService from '../services/accomodationService';
import {
  notFoundResponse,
  successResponse,
  createdResponse,
  confictResponse
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
  const trip = await tripService.createTripRequest(newTripRequest);
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
    if (error) return ApplicationError.databaseError(error, res);
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

export const approveOrRejectTripRequest = async (req, res) => {
  const managerId = req.user.id;
  const { trip, notAssignedError } =
    await tripService.findTripByTripAndManagerId(managerId, req.params.id);
  if (!notAssignedError) {
    if (!trip) return notFoundResponse(res, 'Trip not found');
    if (trip.status === 'pending' && req.body.status === 'approved') {
      const { updatedTrip, error } = await tripService.approveOrRejectTrip(
        req.params.id,
        req.body.status,
        managerId
      );
      if (error) return ApplicationError.databaseError(error, res);
      successResponse(
        res,
        200,
        `Trip Owned By: ${updatedTrip.ownedBy.firstname} ${updatedTrip.ownedBy.lastname} has been ${updatedTrip.status}`,
        updatedTrip
      );
    } else if (trip.status === 'pending' && req.body.status === 'rejected') {
      const { updatedTrip, error } = await tripService.approveOrRejectTrip(
        req.params.id,
        req.body.status,
        managerId
      );
      if (error) return ApplicationError.databaseError(error, res);
      successResponse(
        res,
        200,
        `Trip Owned By: ${updatedTrip.ownedBy.firstname} ${updatedTrip.ownedBy.lastname} has been ${updatedTrip.status}`,
        updatedTrip
      );
    } else if (trip.status === 'approved' && req.body.status === 'rejected') {
      const { updatedTrip, error } = await tripService.approveOrRejectTrip(
        req.params.id,
        req.body.status,
        managerId
      );
      if (error) return ApplicationError.databaseError(error, res);
      successResponse(
        res,
        200,
        `Trip Owned By: ${updatedTrip.ownedBy.firstname} ${updatedTrip.ownedBy.lastname} has been ${updatedTrip.status}`,
        updatedTrip
      );
    } else if (trip.status === 'approved' && req.body.status === 'pending') {
      const { updatedTrip, error } = await tripService.approveOrRejectTrip(
        req.params.id,
        req.body.status,
        managerId
      );
      if (error) return ApplicationError.databaseError(error, res);
      successResponse(
        res,
        200,
        `Trip Owned By: ${updatedTrip.ownedBy.firstname} ${updatedTrip.ownedBy.lastname} is now ${updatedTrip.status}`,
        updatedTrip
      );
    } else if (trip.status === 'rejected' && req.body.status === 'approved') {
      const { updatedTrip, error } = await tripService.approveOrRejectTrip(
        req.params.id,
        req.body.status,
        managerId
      );
      if (error) return ApplicationError.databaseError(error, res);
      successResponse(
        res,
        200,
        `Trip Owned By: ${updatedTrip.ownedBy.firstname} ${updatedTrip.ownedBy.lastname} has been ${updatedTrip.status}`,
        updatedTrip
      );
    } else if (trip.status === 'rejected' && req.body.status === 'pending') {
      const { updatedTrip, error } = await tripService.approveOrRejectTrip(
        req.params.id,
        req.body.status,
        managerId
      );
      if (error) return ApplicationError.databaseError(error, res);
      successResponse(
        res,
        200,
        `Trip Owned By: ${updatedTrip.ownedBy.firstname} ${updatedTrip.ownedBy.lastname} is now ${updatedTrip.status}`,
        updatedTrip
      );
    } else if (trip.status === 'approved' && req.body.status === 'approved') {
      confictResponse(
        res,
        409,
        `Trip Owned By: ${trip.ownedBy.firstname} ${trip.ownedBy.lastname} is already ${trip.status}`,
        trip
      );
    } else if (trip.status === 'rejected' && req.body.status === 'rejected') {
      confictResponse(
        res,
        409,
        `Trip Owned By: ${trip.ownedBy.firstname} ${trip.ownedBy.lastname} is already ${trip.status}`,
        trip
      );
    } else if (trip.status === 'pending' && req.body.status === 'pending') {
      confictResponse(
        res,
        409,
        `Trip Owned By: ${trip.ownedBy.firstname} ${trip.ownedBy.lastname} is already ${trip.status}`,
        trip
      );
    } else {
      ApplicationError.AuthorizationError(
        `Not allowed to edit this trip request`,
        res
      );
    }
  } else {
    const { getManagerById } = await accomService.findManagerById(managerId);
    confictResponse(
      res,
      409,
      `Manager: ${getManagerById.firstname} ${getManagerById.lastname} is not assigned to any accomodation`,
      getManagerById
    );
  }
};
