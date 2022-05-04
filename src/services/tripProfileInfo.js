import models from '../database/models';

const { TripProfileInfo } = models;

const createTripProfile = async (userId, tripId) => {
  try {
    const tripInfo = await TripProfileInfo.create({
      userId,
      tripId
    });
    return tripInfo;
  } catch (error) {
    return { error };
  }
};

const fetchTripProfile = async (userId) => {
  const getRecord = await TripProfileInfo.findOne({
    where: { userId },
    include: [
      {
        model: models.Users,
        attributes: ['firstname', 'lastname']
      },
      {
        model: models.Trips,
        attributes: { exclude: ['userId'] }
      }
    ],
    attributes: ['id']
  });

  return getRecord;
};

const findOneTripInfo = async (userId) => {
  try {
    const tripInfo = await TripProfileInfo.findOne({
      where: { userId }
    });
    return tripInfo;
  } catch (error) {
    return { error };
  }
};

const updateTripProfileInfo = async (userId, newValue) => {
  try {
    await TripProfileInfo.update(newValue, {
      where: {
        userId
      }
    });
    return { updated: true };
  } catch (error) {
    return { error };
  }
};

const isSavingTripInfo = async (trip, req) => {
  if (!req.body.saveInfo) return false;
  const profileInfo = await findOneTripInfo(req.user.id);
  return profileInfo && profileInfo.dataValues
    ? updateTripProfileInfo(req.user.id, { tripId: trip.dataValues.id })
    : createTripProfile(req.user.id, trip.dataValues.id);
};

export {
  fetchTripProfile,
  createTripProfile,
  findOneTripInfo,
  isSavingTripInfo,
  updateTripProfileInfo
};
