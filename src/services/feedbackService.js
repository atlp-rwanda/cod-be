import models from '../database/models';

const { Trips, Feedback } = models;

const checkWhoFeedback = async (userId, accomodationId) => {
  try {
    const trip = await Trips.findOne({ where: { userId, accomodationId } });
    const { dateOfTravel, dateOfReturn } = trip.dataValues;
    const travelDays =
      Math.abs(dateOfReturn - dateOfTravel) / (1000 * 3600 * 24);
    return trip && trip.status === 'approved' && travelDays >= 1;
  } catch (error) {
    return { error };
  }
};

const createFeedback = async (userId, accomodationId, aFeedback) => {
  try {
    const feedback = await Feedback.create({
      feedback: aFeedback,
      userId,
      accomodationId
    });
    return feedback;
  } catch (error) {
    return { error };
  }
};

const fetchFeedback = async (accomodationId) => {
  const getRecord = await Feedback.findAll({
    where: { accomodationId: `${accomodationId}` },
    include: [
      {
        model: models.Users,
        attributes: ['firstname', 'lastname']
      },
      {
        model: models.Accomodation,
        attributes: ['name', 'location']
      }
    ],
    attributes: { exclude: ['userId', 'tripId', 'accomodationId'] }
  });

  return getRecord;
};

export { fetchFeedback, createFeedback, checkWhoFeedback };
