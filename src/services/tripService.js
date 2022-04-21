import models from '../database/models';

const { Trips, Accomodation, Users } = models;

export const createTripRequest = async (trip) => {
  try {
    const newTrip = await Trips.create(trip);
    return newTrip;
  } catch (err) {
    return { error: err };
  }
};
export const findAllTripRequest = async () => {
  const trips = await Trips.findAll({});
  return { trips };
};
export const findTripById = async (tripId) => {
  try {
    const trip = await Trips.findOne({
      where: { id: tripId },
      include: [
        {
          model: Accomodation,
          attributes: ['id', 'name']
        }
      ],
      attributes: { exclude: ['accomodationId'] }
    });
    return { trip };
  } catch (err) {
    return { error: err };
  }
};
export const findTripByUserId = async (userId) => {
  try {
    const trips = await Trips.findAll({
      where: { userId },
      include: [
        {
          model: Accomodation,
          attributes: ['id', 'name']
        }
      ],
      attributes: { exclude: ['accomodationId'] }
    });
    return { trips };
  } catch (err) {
    return { error: err };
  }
};

export const findTripByManagerId = async (managerId) => {
  try {
    const trips = await Trips.findAll({
      include: [
        {
          model: Accomodation,
          where: { managerId },
          attributes: ['id', 'name']
        },
        { model: Users, attributes: ['id', 'firstname', 'lastname'] }
      ],
      attributes: { exclude: ['accomodationId'] }
    });
    return { trips };
  } catch (err) {
    return { error: err };
  }
};
export const deleteTripRequest = async (tripId) => {
  try {
    const value = await Trips.destroy({ where: { id: tripId } });
    return { value };
  } catch (err) {
    return { error: err };
  }
};
export const updateTrip = async (tripId, newTripValue) => {
  try {
    await Trips.update(newTripValue, {
      where: {
        id: tripId
      }
    });
    return { value: true };
  } catch (err) {
    return { error: err };
  }
};
