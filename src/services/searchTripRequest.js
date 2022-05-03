import * as queryHelper from '../utils/helpers/queryHelper';

const searchByName = async (name, userId, userRole) => {
  const results = await queryHelper.tripSearchByName(userRole, name, userId);
  if (!results || results.length === 0) {
    return null;
  }
  return results;
};

const searchByUserEmail = async (email, userId, userRole) => {
  const results = await queryHelper.searchByEmail(email, userId, userRole);
  if (!results || results.length === 0) {
    return null;
  }
  return results;
};

const searchByDestination = async (destinationKey, userRole, userId) => {
  const results = await queryHelper.byDestination(
    destinationKey,
    userRole,
    userId
  );
  if (!results || results.length === 0) {
    return null;
  }
  return results;
};

const searchByDeparture = async (departureKey, userId, role) => {
  const results = await queryHelper.byDeparture(departureKey, userId, role);
  if (!results || results.length === 0) {
    return null;
  }
  return results;
};

const searchByStartDate = async (keyStartDate, userRole, userId) => {
  const results = await queryHelper.byStartDate(keyStartDate, userId, userRole);
  if (!results || results.length === 0) {
    return null;
  }
  return results;
};

const searchByStatus = async (keyStatus, userRole, userId) => {
  const results = await queryHelper.byStatus(keyStatus, userId, userRole);
  if (!results || results.length === 0) {
    return null;
  }
  return results;
};

const searchByDepartureDestination = async (
  departure,
  destination,
  userId,
  userRole
) => {
  const results = await queryHelper.byDepartureAndDestination(
    departure,
    destination,
    userId,
    userRole
  );
  if (!results || results.length === 0) {
    return null;
  }
  return results;
};
const searchByDuration = async (keyDuration, userRole, userId) => {
  const results = await queryHelper.ByDuration(keyDuration, userRole, userId);
  if (!results || results.length === 0) {
    return null;
  }
  return results;
};

export {
  searchByName,
  searchByUserEmail,
  searchByDestination,
  searchByDeparture,
  searchByStartDate,
  searchByStatus,
  searchByDepartureDestination,
  searchByDuration
};
