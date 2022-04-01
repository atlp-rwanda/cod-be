import * as ApplicationError from '../utils/errors/applicationsErrors';
import { successResponse, createdResponse } from '../utils/responseHandler';
import { UpdateOrCreate, getLikes } from '../services/likeService';
import { Like } from '../database/models';
import { getById } from '../services/accomodationService';

const like = async (req, res) => {
  try {
    const { accomodation_id: accomodationId } = req.params;
    const { id: userId } = req.user;
    const accomodationExist = await getById(accomodationId);
    if (!accomodationExist) {
      return ApplicationError.notFoundError(
        'This accomodation does not exist',
        res
      );
    }
    const { created } = await UpdateOrCreate(
      Like,
      { accomodationId, userId },
      true
    ); // UpdateOrCreate(model, {item}, flag) if flag is true means like unless it is dislike
    if (created) {
      return createdResponse(res, `You have liked accomodation`);
    }
    return successResponse(res, 200, `You have unliked an accomodation`);
  } catch (error) {
    return ApplicationError.internalServerError(error.message, res);
  }
};
const disLike = async (req, res) => {
  try {
    const { accomodation_id: accomodationId } = req.params;
    const { id: userId } = req.user;
    const accomodationExist = await getById(accomodationId);
    if (!accomodationExist) {
      return ApplicationError.notFoundError(
        'This accomodation does not exist',
        res
      );
    }
    const { created } = await UpdateOrCreate(
      Like,
      { accomodationId, userId },
      false
    ); // UpdateOrCreate(model, {where and item})
    if (created) {
      return createdResponse(res, `You have disliked an accomodation`);
    }
    return successResponse(res, 200, `You have undisliked an accomodation`);
  } catch (error) {
    return ApplicationError.internalServerError(error.message, res);
  }
};
const allLikes = async (req, res) => {
  try {
    const { accomodation_id: accomodationId } = req.params;
    const accomodationExist = await getById(accomodationId);
    if (!accomodationExist) {
      return ApplicationError.notFoundError(
        'This accomodation does not exist',
        res
      );
    }
    const accomodationLikes = await getLikes(accomodationId, true);
    if (!accomodationLikes.length) {
      return successResponse(res, 200, `No likes for this accomodation`, {
        total_likes: 0
      });
    }
    return successResponse(
      res,
      200,
      `You succesfully got likes of accomodation`,
      {
        total_likes: accomodationLikes.length,
        likedBy: accomodationLikes
      }
    );
  } catch (error) {
    return ApplicationError.internalServerError(error.message, res);
  }
};
const allDisLikes = async (req, res) => {
  try {
    const { accomodation_id: accomodationId } = req.params;
    const accomodationExist = await getById(accomodationId);
    if (!accomodationExist) {
      return ApplicationError.notFoundError(
        'This accomodation does not exist',
        res
      );
    }
    const accomodationDisLikes = await getLikes(accomodationId, false); // Dislikes
    if (!accomodationDisLikes.length) {
      return successResponse(res, 200, `No dislikes for this accomodation`, {
        total_dislikes: 0
      });
    }
    return successResponse(
      res,
      200,
      `You succesfully got dislikes of accomodation`,
      {
        total_dislikes: accomodationDisLikes.length,
        dislikedBy: accomodationDisLikes
      }
    );
  } catch (error) {
    return ApplicationError.internalServerError(error.message, res);
  }
};
export { like, disLike, allLikes, allDisLikes };
