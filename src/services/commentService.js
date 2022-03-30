import models from '../database/models';

const { Users, Trips, Comments } = models;

const checkCommentOwner = async (commentId, userId) =>{
  try{
    const user = await Users.findOne({ where: { id: `${userId}` } });
    const comment = await Comments.findOne({where:{id: commentId}});
    const isOwner = comment.UserId === userId;
    return user.hasComment(comment) && isOwner
  }
 catch(error){
   return {error: error.message}
 }
} 

const createComment = async (userId, tripId, aComment) => {
  try {
    const user = await Users.findOne({ where: { id: `${userId}` } });
    const trip = await Trips.findOne({ where: { id: `${tripId}` } });
    const comment = await Comments.create({
      UserId: user.id,
      TripId: trip.id,
      comment: aComment
    });
    return comment;
  } catch (error) {
    return { error: error.message };
  }
};

const fetchComments = async (tripId) => {
  const getRecord = await Comments.findAll({
    where: { TripId: `${tripId}` },
    include: [
      {
        model: models.Users,
        attributes: ['firstname', 'lastname']
      },
      {
        model: models.Trips,
        attributes: ['departure','destination','dateOfTravel']
      }
    ],
    attributes: { exclude: ['UserId', 'TripId'] }
  });

  return getRecord;
};

const findCommentById = async (commentId) => {
  try {
    const comment = await Comments.findOne({ where: { id: commentId } });
    return  comment;
  } catch (err) {
    return { error: err.message };
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
export { createComment, fetchComments, findCommentById, deleteComment, checkCommentOwner };
