import * as ApplicationError from '../utils/errors/applicationsErrors';
import { tripService, roleService } from '../services';
import * as accomService from '../services/accomodationService';
import changeToArray from '../utils/helpers/changeToArray';
import {
  notFoundResponse,
  successResponse,
  createdResponse,
  confictResponse
} from '../utils/responseHandler';
import { addProfileInfo } from './tripProfileController';
import * as notification from '../services/notificationService';
import {
  sendNotification,
  sendStatusNotification
} from '../utils/helpers/sendNotificationEmail';

export const makeTripRequest = async (req, res) => {
  const {
    departure,
    dateOfTravel,
    dateOfReturn,
    travelReason,
    accomodationId
  } = req.body;
  const destination = changeToArray(req.body.destination);
  const newTripRequest = {
    departure,
    destination,
    dateOfTravel,
    dateOfReturn,
    travelReason,
    accomodationId,
    userId: req.user.id
  };
  const { trip, error, badRequest } = await tripService.createTripRequest(
    newTripRequest
  );
  if (badRequest) return ApplicationError.badRequestError(badRequest, res);
  if (trip) {
    /** raise a notification for a new trip */
    const newNotification = {
      title: 'New Trip Request Created',
      message: 'Check for A new Trip Made in Your Accomodation',
      type: 'application',
      tripId: trip.id,
      addedBy: req.user.id,
      category: 'created'
    };
    await notification.addTripStatusNotification(newNotification);
    await sendNotification(req.user.email, accomodationId);
    return (
      (await addProfileInfo(trip, req, res)) ||
      createdResponse(res, 'New trip request made successfully', trip)
    );
  }
  return ApplicationError.internalServerError(error, res);
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
    req.body.destination = changeToArray(req.body.destination);
    const { error } = await tripService.updateTrip(req.params.id, req.body);
    if (error) return ApplicationError.internalServerError(error, res);
    /** raise a notification for updating trip trequest */
    const updating = {
      title: 'Trip Request Updated',
      message: 'Check for An Update To A Trip Made in Your Accomodation',
      type: 'application',
      tripId: trip.id,
      addedBy: req.user.id,
      category: 'updated'
    };
    await notification.addTripStatusNotification(updating);
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
      /** raise a notification on trip request status changed */
      const updatingStatus = {
        title: 'Trip Request Status Changed',
        message: 'Your Trip Request is Approved',
        type: 'application',
        tripId: trip.id,
        addedBy: req.user.id,
        category: 'status'
      };
      await notification.addTripStatusNotification(updatingStatus);
      await sendStatusNotification(updatedTrip.ownedBy.email, req.body.status);
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
      /** raise a notification on trip request status changed */
      const updatingStatus = {
        title: 'Trip Request Status Changed',
        message: 'Your Trip Request is Rejected',
        type: 'application',
        tripId: trip.id,
        addedBy: req.user.id,
        category: 'status'
      };
      await notification.addTripStatusNotification(updatingStatus);
      await sendStatusNotification(updatedTrip.ownedBy.email, req.body.status);
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
      /** raise a notification on trip request status changed */
      const updatingStatus = {
        title: 'Trip Request Status Changed',
        message: 'Your Trip Request is Rejected',
        type: 'application',
        tripId: trip.id,
        addedBy: req.user.id,
        category: 'status'
      };
      await notification.addTripStatusNotification(updatingStatus);
      await sendStatusNotification(updatedTrip.ownedBy.email, req.body.status);
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
      /** raise a notification on trip request status changed */
      const updatingStatus = {
        title: 'Trip Request Status Changed',
        message: 'Check for An Update To A Trip You Made',
        type: 'application',
        tripId: trip.id,
        addedBy: req.user.id,
        category: 'status'
      };
      await notification.addTripStatusNotification(updatingStatus);
      await sendStatusNotification(updatedTrip.ownedBy.email, req.body.status);
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
      /** raise a notification on trip request status changed */
      const updatingStatus = {
        title: 'Trip Request Status Changed',
        message: 'Your Trip Request is Approved',
        type: 'application',
        tripId: trip.id,
        addedBy: req.user.id,
        category: 'status'
      };
      await notification.addTripStatusNotification(updatingStatus);
      await sendStatusNotification(updatedTrip.ownedBy.email, req.body.status);

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
      /** raise a notification on trip request status changed */
      const updatingStatus = {
        title: 'Trip Request Status Changed',
        message: 'Check for An Update To A Trip You Made',
        type: 'application',
        tripId: trip.id,
        addedBy: req.user.id,
        category: 'status'
      };
      await notification.addTripStatusNotification(updatingStatus);
      await sendStatusNotification(updatedTrip.ownedBy.email, req.body.status);
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
