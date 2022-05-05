/* eslint-disable import/prefer-default-export */
import * as tripRequest from '../services/searchTripRequest';
import * as notFound from '../utils/errors/notFoundError';
import * as applicationError from '../utils/errors/applicationsErrors';
import * as roleService from '../services/rolesService';
import { successResponse } from '../utils/responseHandler';

const tripRequestSearch = async (req, res) => {
  if (req.query.departure && req.query.destination) {
    try {
      const { departure, destination } = req.query;
      const role = await roleService.getUserRole(req.user.id);
      const findTrips = await tripRequest.searchByDepartureDestination(
        departure,
        destination,
        req.user.id,
        role
      );
      if (findTrips) {
        return successResponse(res, 200, `Trip Requests fetched`, {
          trips: findTrips
        });
      }
      return notFound.isNotFound(
        { data: { message: 'Not found, try again!' } },
        res
      );
    } catch (error) {
      console.log(error);
      return applicationError.internalServerError(
        { data: { message: `Error: ${error} ,try again!` } },
        res
      );
    }
  }

  if (req.query.name) {
    try {
      const { name } = req.query;
      const role = await roleService.getUserRole(req.user.id);
      const findTrips = await tripRequest.searchByName(name, req.user.id, role);
      if (findTrips) {
        return successResponse(res, 200, `Trip Requests fetched`, {
          trips: findTrips
        });
      }
      return notFound.isNotFound(
        { data: { message: 'Not found, try again!' } },
        res
      );
    } catch (error) {
      return applicationError.internalServerError(
        { data: { message: `Error: ${error} ,try again!` } },
        res
      );
    }
  }

  if (req.query.email) {
    try {
      const userRole = await roleService.getUserRole(req.user.id);
      const findTrips = await tripRequest.searchByUserEmail(
        req.query.email,
        req.user.id,
        userRole
      );
      if (findTrips) {
        return successResponse(res, 200, `Trip Requests fetched`, {
          trips: findTrips
        });
      }
      return notFound.isNotFound(
        { data: { message: 'Not found, try again!' } },
        res
      );
    } catch (error) {
      applicationError.internalServerError(
        { data: { message: `Error: ${error} ,try again!` } },
        res
      );
    }
  }

  if (req.query.destination) {
    try {
      const { destination } = req.query;
      const userRole = await roleService.getUserRole(req.user.id);
      const findTrips = await tripRequest.searchByDestination(
        destination,
        userRole,
        req.user.id
      );
      if (findTrips) {
        return successResponse(res, 200, `Trip Requests fetched`, {
          trips: findTrips
        });
      }
      return notFound.isNotFound(
        { data: { message: 'Not found, try again!' } },
        res
      );
    } catch (error) {
      return applicationError.internalServerError(
        { data: { message: `Error: ${error} ,try again!` } },
        res
      );
    }
  }

  if (req.query.departure) {
    try {
      const userRole = await roleService.getUserRole(req.user.id);
      const findTrips = await tripRequest.searchByDeparture(
        req.query.departure,
        req.user.id,
        userRole
      );
      if (findTrips) {
        return successResponse(res, 200, `Trip Requests fetched`, {
          trips: findTrips
        });
      }
      return notFound.isNotFound(
        { data: { message: 'Not found, try again!' } },
        res
      );
    } catch (error) {
      return applicationError.internalServerError(
        { data: { message: `Error: ${error} ,try again!` } },
        res
      );
    }
  }

  if (req.query.startDate) {
    try {
      const userRole = await roleService.getUserRole(req.user.id);
      const findTrips = await tripRequest.searchByStartDate(
        req.query.startDate,
        userRole,
        req.user.id
      );
      if (findTrips) {
        return successResponse(res, 200, `Trip Requests fetched`, {
          trips: findTrips
        });
      }
      return notFound.isNotFound(
        { data: { message: 'Not found, try again!' } },
        res
      );
    } catch (error) {
      return applicationError.internalServerError(
        { data: { message: `Error: ${error} ,try again!` } },
        res
      );
    }
  }

  if (req.query.currentStatus) {
    try {
      const userRole = await roleService.getUserRole(req.user.id);
      const findTrips = await tripRequest.searchByStatus(
        req.query.currentStatus,
        userRole,
        req.user.id
      );
      if (findTrips) {
        return successResponse(res, 200, `Trip Requests fetched`, {
          trips: findTrips
        });
      }
      return notFound.isNotFound(
        { data: { message: 'Not found, try again!' } },
        res
      );
    } catch (error) {
      return applicationError.internalServerError(
        { data: { message: `Error: ${error} ,try again!` } },
        res
      );
    }
  }
  if (req.query.duration) {
    try {
      const userRole = await roleService.getUserRole(req.user.id);
      const findTrips = await tripRequest.searchByDuration(
        req.query.duration,
        userRole,
        req.user.id
      );
      if (findTrips) {
        return successResponse(res, 200, `Trip Requests fetched`, {
          trips: findTrips
        });
      }
      return notFound.isNotFound(
        { data: { message: 'Not found, try again!' } },
        res
      );
    } catch (error) {
      return applicationError.internalServerError(
        { data: { message: `Error, try again!` } },
        res
      );
    }
  }
  return notFound.isNotFound(
    { data: { message: 'Not found, try again!' } },
    res
  );
};

export { tripRequestSearch };
