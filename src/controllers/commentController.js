import * as ApplicationError from '../utils/errors/applicationsErrors';
import * as commentService from '../services/commentService';
import * as notification from '../services/notificationService';

import {
  createdResponse,
  notFoundResponse,
  successResponse
} from '../utils/responseHandler';

export const addComment = async (req, res) => {
  try {
    const { tripId } = req.params;
    const userId = req.user.id;
    const comment = await commentService.createComment(
      userId,
      tripId,
      req.body.comment
    );
    /** raise a notification */
    const newNotification = {
      title: 'New Comment To A trip You Made',
      message: req.body.comment,
      type: 'application',
      tripId,
      addedBy: userId,
      category: 'comment'
    };
    await notification.addTripCommentNotification(newNotification);

    return comment.error
      ? ApplicationError.validationError(comment.error.message, res)
      : createdResponse(res, 'Comment created successfully', comment);
  } catch (error) {
    ApplicationError.internalServerError(`${error}`, res);
  }
};

export const getComments = async (req, res) => {
  const { tripId } = req.params;
  try {
    const comment = await commentService.fetchComments(tripId);
    return comment.error
      ? ApplicationError.validationError(comment.error.message, res)
      : successResponse(res, 200, 'Comments fetched successfully', comment);
  } catch (error) {
    ApplicationError.internalServerError(`${error}`, res);
  }
};

export const deleteComment = async (req, res) => {
  const comment = await commentService.findCommentById(req.params.commentId);
  if (
    await commentService.checkCommentOwner(req.params.commentId, req.user.id)
  ) {
    if (!comment) return notFoundResponse(res, 'Comment not found');
    const { error, value } = await commentService.deleteComment(
      req.params.commentId
    );
    if (error) return ApplicationError.databaseError(error, res);
    if (value) return successResponse(res, 200, 'Comment deleted successfully');
  }
  return ApplicationError.forbiddenError("You can't delete this comment", res);
};
