import { fn, col } from 'sequelize';
import models from '../database/models';
import { getUserRole } from './rolesService';
import { getById as getAccomodation } from './accomodationService';

const { Trips, Accomodation } = models;

export const getRequesterAccommodationStats = async (accomodationId) => {
  try {
    const stats = await Trips.findAll({
      attributes: [
        'destination',
        [fn('COUNT', col('Trips.id')), 'trip_request_count']
      ],
      group: ['destination', 'Accomodation.id'],
      order: [[col('trip_request_count'), 'DESC']],
      where: { accomodationId, status: 'approved' },
      include: [
        {
          model: Accomodation,
          attributes: ['name']
        }
      ]
    });
    return { stats };
  } catch (error) {
    return { error };
  }
};
export const getAllRequesterStats = async () => {
  try {
    const stats = await Trips.findAll({
      where: { status: 'approved' },
      attributes: [
        'destination',
        [fn('COUNT', col('Trips.id')), 'trip_request_count']
      ],
      group: ['destination', 'Accomodation.id'],
      order: [[col('trip_request_count'), 'DESC']],
      include: [
        {
          model: Accomodation,
          attributes: ['name']
        }
      ]
    });
    return { stats };
  } catch (error) {
    return { error };
  }
};
export const getAllManagerStats = async (managerId) => {
  try {
    const stats = await Trips.findAll({
      where: { status: 'approved' },
      attributes: [
        'destination',
        [fn('COUNT', col('Trips.id')), 'trip_request_count']
      ],
      group: ['destination', 'Accomodation.id'],
      order: [[col('trip_request_count'), 'DESC']],
      include: [
        {
          model: Accomodation,
          where: { managerId },
          attributes: ['id', 'name']
        }
      ]
    });
    return { stats };
  } catch (error) {
    return { error };
  }
};

export const getManagerAccommodationStats = async (
  accomodationId,
  managerId
) => {
  try {
    const accomodation = await Accomodation.findOne({
      where: { managerId, id: accomodationId }
    });
    if (!accomodation) {
      return { authError: 'Manager not assigned to this accommodation' };
    }
    const stats = await Trips.findAll({
      attributes: [
        'destination',
        [fn('COUNT', col('Trips.id')), 'trip_request_count']
      ],
      group: ['destination', 'Accomodation.id'],
      order: [[col('trip_request_count'), 'DESC']],
      where: { accomodationId, status: 'approved' },
      include: [
        {
          model: Accomodation,
          where: { managerId },
          attributes: ['id', 'name']
        }
      ]
    });
    return { stats };
  } catch (error) {
    return { error };
  }
};

export const getAllDestinationStats = async (userId) => {
  try {
    if ((await getUserRole(userId)) === 'Requester') {
      return await getAllRequesterStats();
    }
    if ((await getUserRole(userId)) === 'Manager') {
      return await getAllManagerStats(userId);
    }
    return {
      authError: 'Only managers and requesters can view destination stats'
    };
  } catch (error) {
    return { error };
  }
};

export const getAccommodationDestinationStats = async (
  accomodationId,
  userId
) => {
  try {
    if (!(await getAccomodation(accomodationId))) {
      return { badRequest: 'Accommodation not found' };
    }
    if ((await getUserRole(userId)) === 'Requester') {
      return await getRequesterAccommodationStats(accomodationId);
    }
    if ((await getUserRole(userId)) === 'Manager') {
      return await getManagerAccommodationStats(accomodationId, userId);
    }
    return {
      authError: 'Only managers and requesters can view destination stats'
    };
  } catch (error) {
    return { error };
  }
};
