/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import * as ApplicationError from '../utils/errors/applicationsErrors';
import * as feedbackService from '../services/feedbackService';
import { createdResponse, successResponse } from '../utils/responseHandler';

export const addFeedback = async (req, res) => {
  try {
    const { accomodationId } = req.params;
    const userId = req.user.id;
    const isAuthorized = await feedbackService.checkWhoFeedback(
      userId,
      accomodationId
    );
    if (!isAuthorized) {
      return ApplicationError.AuthorizationError(
        'At least one day in trip required',
        res
      );
    }
    if (isAuthorized.error) {
      return ApplicationError.notFoundError('Accommodation not found', res);
    }
    const feedback = await feedbackService.createFeedback(
      userId,
      accomodationId,
      req.body.feedback
    );
    return feedback.error
      ? ApplicationError.validationError(feedback.error.message, res)
      : createdResponse(res, 'Feedback added successfully', feedback);
  } catch (error) {
    ApplicationError.internalServerError(error, res);
  }
};

export const getFeedbacks = async (req, res) => {
  try {
    const { accomodationId } = req.params;
    const feedback = await feedbackService.fetchFeedback(accomodationId);
    return feedback.error
      ? ApplicationError.validationError(feedback.error, res)
      : successResponse(res, 200, 'Feedbacks fetched successfully', feedback);
  } catch (error) {
    ApplicationError.internalServerError(error, res);
  }
};
