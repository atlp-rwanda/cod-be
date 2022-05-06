/* eslint-disable */
import * as ApplicationError from '../utils/errors/applicationsErrors';
import { destinationService } from '../services';
import { successResponse } from '../utils/responseHandler';

export const getAccommodationDestinationStats = async (req, res) => {
  const { accomodationId } = req.params;
  const { stats, error, authError, badRequest } =
    await destinationService.getAccommodationDestinationStats(
      accomodationId,
      req.user.id
    );
  if (authError) return ApplicationError.AuthorizationError(authError, res);
  if (badRequest) return ApplicationError.notFoundError(badRequest, res);
  if (error) return ApplicationError.internalServerError(error, res);
  return successResponse(
    res,
    200,
    'Destination statistics fetched successfully',
    stats
  );
};

export const getAllDestinationStats = async (req, res) => {
  const { stats, error, authError } =
    await destinationService.getAllDestinationStats(req.user.id);
  if (authError) return ApplicationError.AuthorizationError(authError, res);
  if (error) return ApplicationError.internalServerError(error, res);
  return successResponse(
    res,
    200,
    'Destination statistics fetched successfully',
    stats
  );
};
