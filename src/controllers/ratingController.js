/* eslint-disable no-plusplus */
import {
  notFoundError,
  internalServerError,
  AuthorizationError
} from '../utils/errors/applicationsErrors';
import {
  createRating,
  getAllRatings,
  isAccomodated
} from '../services/ratingService';
import { classifyRating, getRatingArray } from '../utils/helpers/ratingHelpers';
import { average } from '../utils/helpers/mathHelpers';
import { getById } from '../services/accomodationService';
import { successResponse, createdResponse } from '../utils/responseHandler';

const addRating = async (req, res) => {
  // This is controller to add the rating to an accomodation
  try {
    const { id: userId } = req.user;
    const { accomodation_id: accomodationId } = req.params;
    const accomodation = await getById(accomodationId);
    if (!accomodation) {
      return notFoundError('That accomodation does not exist', res);
    }
    const accomodated = await isAccomodated(userId, accomodationId);
    if (!accomodated) {
      return AuthorizationError(
        'You had not been to this accomodation. You can not rate it',
        res
      );
    }
    const { serviceRating } = req.body;

    const created = await createRating(userId, accomodationId, serviceRating);
    if (created) {
      return createdResponse(
        res,
        `You have rated accomodation with id ${accomodationId} with ${serviceRating} stars`
      );
    }

    return successResponse(
      res,
      200,
      `You have updated ratings of accomodation with id ${accomodationId} to ${serviceRating} stars`
    );
  } catch (error) {
    return internalServerError(`${error}`, res);
  }
};
const allRatings = async (req, res) => {
  // This is controller to give the average of ratings of specific accomodation
  try {
    const { accomodation_id: accomodationId } = req.params;
    const accomodation = await getById(accomodationId);
    if (!accomodation) {
      return notFoundError('That accomodation does not exist', res);
    }
    const ratingsResponse = await getAllRatings(accomodationId); // retrieve all ratings of an accomodation from db
    const ratings = getRatingArray(ratingsResponse);
    if (!ratings.length) {
      return successResponse(res, 200, 'No ratings for this accomodation');
    }

    return successResponse(
      res,
      200,
      `Ratings of accomodation ${accomodationId}`,
      { rating: average(ratings) }
    );
  } catch (error) {
    return internalServerError('Error in the server', res);
  }
};
const getRatings = async (req, res) => {
  // This controller to get classification of ratings for an  accomodation ex:{"1": 4, "5":8}
  try {
    const { accomodation_id: accomodationId } = req.params;
    const accomodation = await getById(accomodationId);
    if (!accomodation) {
      return notFoundError('That accomodation does not exist', res);
    }
    const ratings = await getAllRatings(accomodationId);
    if (!ratings.length) {
      return successResponse(res, 200, 'No ratings for this accomodation');
    }

    return successResponse(
      res,
      200,
      `Ratings of accomodation ${accomodationId}`,
      { rating: classifyRating(ratings) }
    );
  } catch (error) {
    return internalServerError('Error in the server', res);
  }
};

export { addRating, allRatings, getRatings };
