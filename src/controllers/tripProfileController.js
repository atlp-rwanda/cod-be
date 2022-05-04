/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import * as ApplicationError from '../utils/errors/applicationsErrors';
import {
  createdResponse,
  notFoundResponse,
  successResponse
} from '../utils/responseHandler';
import {
  fetchTripProfile,
  findOneTripInfo,
  isSavingTripInfo
} from '../services/tripProfileInfo';

export const addProfileInfo = async (trip, req, res) => {
  const tripProfile = await isSavingTripInfo(trip, req);
  if (tripProfile && tripProfile.dataValues) {
    return createdResponse(
      res,
      'New trip request made successfully and info saved',
      trip
    );
  }
  if (tripProfile && tripProfile.updated) {
    return createdResponse(
      res,
      'New trip request made successfully and info updated',
      trip
    );
  }
  if (!tripProfile) return false;
};

export const getTripProfileInfo = async (req, res) => {
  try {
    if ((await findOneTripInfo(req.user.id)) === null) {
      notFoundResponse(res, 'Trip Profile Not Found');
    }
    const profile = await fetchTripProfile(req.user.id);
    return profile.error
      ? ApplicationError.validationError(profile.error, res)
      : successResponse(res, 200, 'Profile fetched successfully', profile);
  } catch (error) {
    ApplicationError.internalServerError(error, res);
  }
};
