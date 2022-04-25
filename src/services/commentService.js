import models from '../database/models';
import { getUserRole } from './rolesService';

const { Users, Trips, Comments } = models;

const checkCommenter = async (userId, tripId) => {
  try {
    const user = await Users.findOne({ where: { id: `${userId}` } });
    const trip = await Trips.findOne({ where: { id: tripId } });
    const isManager = (await getUserRole(userId)) === 'Manager';
    const isRightUser = user.hasTrip(trip.id) && trip.userId === user.id;
    return isRightUser || isManager;
  } catch (error) {
    return { error };
  }
};

const checkCommentOwner = async (commentId, userId) => {
  try {
    const user = await Users.findOne({ where: { id: `${userId}` } });
    const comment = await Comments.findOne({ where: { id: commentId } });
    const isOwner = comment.userId === userId;
    return user.hasComment(comment) && isOwner;
  } catch (error) {
    return { error };
  }
};

const createComment = async (userId, tripId, aComment) => {
  try {
    const user = await Users.findOne({ where: { id: `${userId}` } });
    const trip = await Trips.findOne({ where: { id: `${tripId}` } });
    const comment = await Comments.create({
      userId: user.id,
      tripId: trip.id,
      comment: aComment
    });
    return comment;
  } catch (error) {
    return { error };
  }
};

const fetchComments = async (tripId) => {
  const getRecord = await Comments.findAll({
    where: { tripId: `${tripId}` },
    include: [
      {
        model: models.Users,
        attributes: ['firstname', 'lastname']
      },
      {
        model: models.Trips,
        attributes: ['departure', 'destination', 'dateOfTravel']
      }
    ],
    attributes: { exclude: ['userId', 'tripId'] }
  });

  return getRecord;
};

const findCommentById = async (commentId) => {
  try {
    const comment = await Comments.findOne({ where: { id: commentId } });
    return comment;
  } catch (err) {
    return { error: err };
  }
};

const deleteComment = async (commentId) => {
  try {
    const value = await Comments.destroy({ where: { id: commentId } });
    return { value };
  } catch (err) {
    return { error: err };
  }
};
export {
  createComment,
  fetchComments,
  findCommentById,
  deleteComment,
  checkCommentOwner,
  checkCommenter
};
