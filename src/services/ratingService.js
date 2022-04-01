import { updateOrCreate } from './userService';
import { Rating, Trips } from '../database/models';

const createRating = async (userId, accomodationId, serviceRating) => {
  const { created } = await updateOrCreate(
    Rating,
    { userId, accomodationId },
    { userId, accomodationId, serviceRating }
  );
  return created;
};
const isAccomodated = async (userId, accomodationId) => {
  const hasAccomodated = await Trips.findOne({
    where: { userId, accomodationId, status: 'approved' }
  });
  const userAccomodated = !!hasAccomodated; // This become true if this trip exist in the db unless it gives out false
  return userAccomodated;
};

const getAllRatings = async (id) => {
  const ratings = await Rating.findAll({
    where: { accomodationId: id },
    attributes: {
      exclude: ['id', 'accomodationId', 'userId', 'createdAt', 'updatedAt']
    }
  });
  return ratings;
};
export { createRating, getAllRatings, isAccomodated };
