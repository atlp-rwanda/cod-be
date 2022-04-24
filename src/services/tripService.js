import { Op } from 'sequelize';
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
export const findTripByTripAndManagerId = async (managerId, tripId) => {
  try {
    const accomodations = await Accomodation.findOne({
      where: { managerId }
    });
    if (accomodations !== null) {
      const trip = await Trips.findOne({
        where: {
          accomodationId: `${accomodations.dataValues.id}`,
          id: `${tripId}`
        },
        include: [
          {
            model: Users,
            as: 'ownedBy',
            attributes: ['firstname', 'lastname']
          }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });
      return { trip };
    }
    const notAssignedError = new Error(
      `Manager ${managerId} is not assisgned to any accomodation`
    );
    return { notAssignedError };
  } catch (err) {
    return { error: err.name };
  }
};
export const approveOrRejectTrip = async (tripId, newTripStatus) => {
  try {
    await Trips.update(
      { status: newTripStatus },
      {
        where: {
          id: tripId
        }
      }
    );
    const updatedTrip = await Trips.findOne({
      where: { id: `${tripId}` },
      include: [
        {
          model: Users,
          as: 'ownedBy',
          attributes: ['firstname', 'lastname']
        }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt', 'firstname'] }
    });
    return { updatedTrip };
  } catch (err) {
    return { error: err };
  }
};
export const countTrips = async (userId, start, end, userRole) => {
  try {
    if (userRole === 'Requester') {
      const trips = await Trips.findAndCountAll({
        where: {
          [Op.and]: [
            { userId },
            { createdAt: { [Op.between]: [start, end] } },
            { status: 'approved' }
          ]
        }
      });
      return trips;
    }
    if (userRole === 'Manager') {
      const accomodation = await models.Accomodation.findAll({
        where: { managerId: userId }
      });
      const ids = accomodation.map((accom) => accom.id);
      if (!ids.length) {
        return { count: 0 };
      }
      const trips = await Trips.findAndCountAll({
        where: {
          accomodationId: {
            [Op.or]: ids
          },
          createdAt: { [Op.between]: [start, end] },
          status: 'approved'
        }
      });
      return trips;
    }
  } catch (error) {
    return { error };
  }
};
