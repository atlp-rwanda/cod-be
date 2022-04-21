import { Like, Users } from '../database/models';

const UpdateOrCreate = async (model, data, likeStatus) => {
  const foundData = await model.findOne({ where: { ...data, likeStatus } });
  if (foundData) {
    const item = await model.destroy({ where: data });
    return { item, created: false };
  }
  const foundItem = await model.findOne({ where: data });
  if (foundItem) {
    await model.destroy({ where: data });
  }
  const item = await model.create({ ...data, likeStatus });
  return { item, created: true };
};
const filterLikeArray = async (array) => {
  /* This function receive the array of the like response 
    and return the array of the user who liked the accomodation */
  const newArray = array.map((like) => like.User);
  return newArray;
};

const getLikes = async (accomodationId, likeStatus) => {
  const likes = await Like.findAll({
    where: { accomodationId, likeStatus },
    include: [
      {
        model: Users,
        attributes: ['firstname', 'lastname']
      }
    ],
    attributes: {
      exclude: [
        'id',
        'accomodationId',
        'userId',
        'createdAt',
        'updatedAt',
        'likeStatus'
      ]
    }
  });
  return filterLikeArray(likes);
};
export { UpdateOrCreate, getLikes };
