/* eslint-disable consistent-return */
import * as profileService from '../services/profileService';
import * as ApplicationError from '../utils/errors/applicationsErrors';
import * as profileValidations from '../validations/profileValidation';
import * as notFound from '../utils/errors/notFoundError';

const updateProfile = async (userId, requestBody, response, next) => {
  try {
    const validate = profileValidations.createProfile.validate(requestBody);
    if (!validate.error) {
      const profile = await profileService.findUserProfile(userId);
      if (profile) {
        const updatedProfile = await profileService.updateProfile(
          userId,
          requestBody
        );
        if (updatedProfile) {
          return response.status(200).json({
            status: 200,
            data: { Message: 'Profile updated successfully' }
          });
        }
      } else {
        return notFound.isNotFound(
          { data: { message: 'Profile not found' } },
          response
        );
      }
    } else {
      ApplicationError.validationError(
        validate.error.details[0].context.label,
        response
      );
    }
  } catch (error) {
    ApplicationError.internalServerError(`${error}`, response);
    next(error);
  }
};

const getProfile = async (userId, response, next) => {
  try {
    const profile = await profileService.findUserProfile(userId);
    if (profile) {
      response.json({ message: 'Profile Found', data: profile });
    } else {
      response.json({ message: 'Cant find profile of the user' });
    }
  } catch (error) {
    ApplicationError.internalServerError(`${error}`, response);
    next(error);
  }
};

export default { updateProfile, getProfile };
