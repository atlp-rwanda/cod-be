import * as ApplicationError from '../utils/errors/applicationsErrors';
import { tripService } from '../services';
import { successResponse } from '../utils/responseHandler';
import { getUserRole } from '../services/rolesService';

export const tripStatistics = async (req, res) => {
  const userId = req.user.id;
  const { start, end } = req.query;
  const userRole = await getUserRole(userId);
  if (userRole !== 'Requester' && userRole !== 'Manager') {
    return ApplicationError.AuthorizationError(
      'Statistics of travel are available for requester and Manager',
      res
    );
  }
  const trips = await tripService.countTrips(userId, start, end, userRole);
  if (trips.count !== undefined) {
    return successResponse(
      res,
      200,
      `You succesfully got all trips made between ${start} and ${end} succesfully`,
      { trips: trips.count }
    );
  }
  return ApplicationError.internalServerError(`${trips.error}`, res);
};
export const recentTripStatistic = async (req, res) => {
  const userId = req.user.id;
  let { period } = req.query;
  const { number } = req.query;
  period = period.toLowerCase();
  const end = new Date();
  const start = new Date();
  if (period === 'week' || period === 'weeks') {
    start.setDate(start.getDate() - 7 * number);
  } else if (period === 'day' || period === 'days') {
    start.setDate(start.getDate() - number);
  } else if (period === 'month' || period === 'months') {
    start.setMonth(start.getMonth() - number);
  } else if (period === 'year' || period === 'years') {
    start.setYear(start.getYear() - number);
  } else {
    return ApplicationError.badRequestError('Put valid period', res);
  }
  const userRole = await getUserRole(userId);
  if (userRole !== 'Requester' && userRole !== 'Manager') {
    return ApplicationError.AuthorizationError(
      'Statistics of travel are available for requester and Manager',
      res
    );
  }
  const trips = await tripService.countTrips(userId, start, end, userRole);
  if (trips.count !== undefined) {
    return successResponse(
      res,
      200,
      `You succesfully got all trips made ${number} ${period} ago`,
      { trips: trips.count }
    );
  }
  return ApplicationError.internalServerError(`${trips.error}`, res);
};
