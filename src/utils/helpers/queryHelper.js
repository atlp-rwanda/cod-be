import { sequelize } from '../../database/models';

const tripSearchByName = async (userRole, name, user) => {
  const search = name.toUpperCase();
  if (userRole === 'Travel Administrator') {
    const query =
      'SELECT users.id as "userId",users.firstname,users.lastname,users.email,trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn"' +
      ',accomodations.name as "accommodation" ' +
      'FROM users ' +
      'LEFT JOIN trips ON users.id=trips."userId" ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      'WHERE UPPER(firstname) LIKE:name OR UPPER(lastname) LIKE:name';
    const [results] = await sequelize.query(`${query}`, {
      replacements: { name: `%${search}%` }
    });
    return results;
  }

  if (userRole === 'Manager') {
    const query =
      'SELECT users.id as "userId",users.firstname,users.lastname,users.email,trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn"' +
      ',accomodations.name as "accommodation" ' +
      'FROM users ' +
      'LEFT JOIN trips ON users.id=trips."userId" ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      'WHERE UPPER(firstname) LIKE:name OR UPPER(lastname) LIKE:name ' +
      'AND trips."accomodationId" IN ' +
      `(SELECT id FROM accomodations WHERE "managerId"='${user}')`;
    const [results] = await sequelize.query(`${query}`, {
      replacements: { name: `%${search}%` }
    });
    return results;
  }

  if (userRole === 'Requester') {
    const query =
      'SELECT users.id as "userId",users.firstname,users.lastname,users.email,trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn"' +
      ',accomodations.name as "accommodation" ' +
      'FROM users ' +
      'LEFT JOIN trips ON users.id=trips."userId" ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      'WHERE UPPER(firstname) LIKE:name OR UPPER(lastname) LIKE:name ' +
      `AND trips."userId"='${user}'`;
    const [results] = await sequelize.query(`${query}`, {
      replacements: { name: `%${search}%` }
    });
    return results;
  }
};
const searchByEmail = async (email, user, userRole) => {
  const search = email.toLowerCase();
  if (userRole === 'Travel Administrator') {
    const query =
      'SELECT users.id as "userId",users.firstname,users.lastname,users.email,trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn"' +
      ',accomodations.name as "accommodation" ' +
      'FROM users ' +
      'LEFT JOIN trips ON users.id=trips."userId" ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      'WHERE LOWER(email) LIKE:email';
    const [results] = await sequelize.query(`${query}`, {
      replacements: { email: `%${search}%` }
    });
    return results;
  }

  if (userRole === 'Manager') {
    const query =
      'SELECT users.id as "userId",users.firstname,users.lastname,users.email,trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn"' +
      ',accomodations.name as "accommodation" ' +
      'FROM users ' +
      'LEFT JOIN trips ON users.id=trips."userId" ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      'WHERE LOWER(email) LIKE:email ' +
      'AND trips."accomodationId" IN ' +
      `(SELECT id FROM accomodations WHERE "managerId"='${user}')`;
    const [results] = await sequelize.query(`${query}`, {
      replacements: { email: `%${search}%` }
    });
    return results;
  }

  if (userRole === 'Requester') {
    const query =
      'SELECT users.id as "userId",users.firstname,users.lastname,users.email,trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn"' +
      ',accomodations.name as "accommodation" ' +
      'FROM users ' +
      'LEFT JOIN trips ON users.id=trips."userId" ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      'WHERE LOWER(email) LIKE:email ' +
      `AND trips."userId"='${user}'`;
    const [results] = await sequelize.query(`${query}`, {
      replacements: { email: `%${search}%` }
    });
    return results;
  }
};

const byDeparture = async (departure, user, userRole) => {
  const search = departure.toLowerCase();
  if (userRole === 'Manager') {
    const query =
      'SELECT trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn"' +
      ',users.id as "userId",users.firstname,users.lastname,users.email' +
      ',accomodations.name as "accommodation" ' +
      'FROM trips ' +
      'LEFT JOIN users ON trips."userId"=users.id ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      'WHERE LOWER(departure) LIKE:departure' +
      ` AND trips."accomodationId" IN ` +
      `(SELECT id FROM accomodations WHERE "managerId"='${user}')`;
    const [results] = await sequelize.query(`${query}`, {
      replacements: { departure: `%${search}%` }
    });
    return results;
  }

  if (userRole === 'Requester') {
    const query =
      'SELECT trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn"' +
      ',users.id as "userId",users.firstname,users.lastname,users.email' +
      ',accomodations.name as "accommodation" ' +
      'FROM trips ' +
      'LEFT JOIN users ON trips."userId"=users.id ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      'WHERE LOWER(departure) LIKE:departure' +
      ` AND trips."userId"='${user}' `;
    const [results] = await sequelize.query(`${query}`, {
      replacements: { departure: `%${search}%` }
    });
    return results;
  }

  if (userRole === 'Travel Administrator') {
    const query =
      'SELECT trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn"' +
      ',users.id as "userId",users.firstname,users.lastname,users.email' +
      ',accomodations.name as "accommodation" ' +
      'FROM trips ' +
      'LEFT JOIN users ON trips."userId"=users.id ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      'WHERE LOWER(departure) LIKE:departure';
    const [results] = await sequelize.query(`${query}`, {
      replacements: { departure: `%${search}%` }
    });
    return results;
  }
};

const byStartDate = async (date, user, userRole) => {
  if (userRole === 'Manager') {
    const query =
      'SELECT trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn"' +
      ',users.id as "userId",users.firstname,users.lastname,users.email' +
      ',accomodations.name as "accommodation" ' +
      'FROM trips ' +
      'LEFT JOIN users ON trips."userId"=users.id ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      'WHERE "dateOfTravel"::text LIKE:dateKey' +
      ` AND trips."accomodationId" IN ` +
      `(SELECT id FROM accomodations WHERE "managerId"='${user}')`;
    const [results] = await sequelize.query(`${query}`, {
      replacements: { dateKey: `%${date}%` }
    });
    return results;
  }

  if (userRole === 'Requester') {
    const query =
      'SELECT trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn"' +
      ',users.id as "userId",users.firstname,users.lastname,users.email' +
      ',accomodations.name as "accommodation" ' +
      'FROM trips ' +
      'LEFT JOIN users ON trips."userId"=users.id ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      'WHERE "dateOfTravel"::text LIKE:dateKey' +
      ` AND trips."userId"='${user}' `;
    const [results] = await sequelize.query(`${query}`, {
      replacements: { dateKey: `%${date}%` }
    });
    return results;
  }

  if (userRole === 'Travel Administrator') {
    const query =
      'SELECT trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn"' +
      ',users.id as "userId",users.firstname,users.lastname,users.email' +
      ',accomodations.name as "accommodation" ' +
      'FROM trips ' +
      'LEFT JOIN users ON trips."userId"=users.id ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      'WHERE "dateOfTravel"::text LIKE:dateKey';
    const [results] = await sequelize.query(`${query}`, {
      replacements: { dateKey: `%${date}%` }
    });
    return results;
  }
};

const byStatus = async (statusKey, user, userRole) => {
  const search = statusKey.toLowerCase();
  if (userRole === 'Manager') {
    const query =
      'SELECT trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn",trips.status' +
      ',users.id as "userId",users.firstname,users.lastname,users.email' +
      ',accomodations.name as "accommodation" ' +
      'FROM trips ' +
      'LEFT JOIN users ON trips."userId"=users.id ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      'WHERE status::text LIKE:status' +
      ` AND trips."accomodationId" IN ` +
      `(SELECT id FROM accomodations WHERE "managerId"='${user}')`;
    const [results] = await sequelize.query(`${query}`, {
      replacements: { status: `%${search}%` }
    });
    return results;
  }

  if (userRole === 'Requester') {
    const query =
      'SELECT trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn",trips.status' +
      ',users.id as "userId",users.firstname,users.lastname,users.email' +
      ',accomodations.name as "accommodation" ' +
      'FROM trips ' +
      'LEFT JOIN users ON trips."userId"=users.id ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      'WHERE status::text LIKE:status' +
      ` AND trips."userId"='${user}' `;
    const [results] = await sequelize.query(`${query}`, {
      replacements: { status: `%${search}%` }
    });
    return results;
  }

  if (userRole === 'Travel Administrator') {
    const query =
      'SELECT trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn", trips.status' +
      ',users.id as "userId",users.firstname,users.lastname,users.email' +
      ',accomodations.name as "accommodation" ' +
      'FROM trips ' +
      'LEFT JOIN users ON trips."userId"=users.id ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      'WHERE status::text LIKE:status';
    const [results] = await sequelize.query(`${query}`, {
      replacements: { status: `%${search}%` }
    });
    return results;
  }
};

const byDepartureAndDestination = async (
  origin,
  destination,
  user,
  userRole
) => {
  const searchOne = origin.toLowerCase();
  const searchTwo = destination.toLowerCase();
  if (userRole === 'Manager') {
    const query =
      'SELECT trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn"' +
      ',users.id as "userId",users.firstname,users.lastname,users.email' +
      ',accomodations.name as "accommodation" ' +
      'FROM trips ' +
      'LEFT JOIN users ON trips."userId"=users.id ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      'WHERE LOWER(departure) LIKE:departure' +
      ` AND LOWER(array_to_string(destination, ',')) LIKE:destination` +
      ` AND trips."accomodationId" IN ` +
      `(SELECT id FROM accomodations WHERE "managerId"='${user}')`;
    const [results] = await sequelize.query(`${query}`, {
      replacements: {
        departure: `%${searchOne}%`,
        destination: `%${searchTwo}%`
      }
    });
    return results;
  }
  if (userRole === 'Requester') {
    const query =
      'SELECT trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn"' +
      ',users.id as "userId",users.firstname,users.lastname,users.email' +
      ',accomodations.name as "accommodation" ' +
      'FROM trips ' +
      'LEFT JOIN users ON trips."userId"=users.id ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      'WHERE LOWER(departure) LIKE:departure' +
      ` AND LOWER(array_to_string(destination, ',')) LIKE:destination` +
      ` AND trips."userId"='${user}' `;
    const [results] = await sequelize.query(`${query}`, {
      replacements: {
        departure: `%${searchOne}%`,
        destination: `%${searchTwo}%`
      }
    });
    return results;
  }

  if (userRole === 'Travel Administrator') {
    const query =
      'SELECT trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn"' +
      ',users.id as "userId",users.firstname,users.lastname,users.email' +
      ',accomodations.name as "accommodation" ' +
      'FROM trips ' +
      'LEFT JOIN users ON trips."userId"=users.id ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      'WHERE LOWER(departure) LIKE:departure' +
      ` AND LOWER(array_to_string(destination, ',')) LIKE:destination`;
    const [results] = await sequelize.query(`${query}`, {
      replacements: {
        departure: `%${searchOne}%`,
        destination: `%${searchTwo}%`
      }
    });
    return results;
  }
};

const byDestination = async (destination, userRole, user) => {
  const search = destination.toLowerCase();
  if (userRole === 'Travel Administrator') {
    const query =
      'SELECT trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn"' +
      ',users.id as "userId",users.firstname,users.lastname,users.email' +
      ',accomodations.name as "accommodation" ' +
      'FROM trips ' +
      'LEFT JOIN users ON trips."userId"=users.id ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      `WHERE LOWER(array_to_string(destination, ',')) LIKE:destination`;
    const [results] = await sequelize.query(`${query}`, {
      replacements: { destination: `%${search}%` }
    });
    return results;
  }
  if (userRole === 'Manager') {
    const query =
      'SELECT trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn"' +
      ',users.id as "userId",users.firstname,users.lastname,users.email' +
      ',accomodations.name as "accommodation" ' +
      'FROM trips ' +
      'LEFT JOIN users ON trips."userId"=users.id ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      `WHERE LOWER(array_to_string(destination, ',')) LIKE:destination` +
      ` AND trips."accomodationId" IN ` +
      `(SELECT id FROM accomodations WHERE "managerId"='${user}')`;
    const [results] = await sequelize.query(`${query}`, {
      replacements: { destination: `%${search}%` }
    });
    return results;
  }
  if (userRole === 'Requester') {
    const query =
      'SELECT trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn"' +
      ',users.id as "userId",users.firstname,users.lastname,users.email' +
      ',accomodations.name as "accommodation" ' +
      'FROM trips ' +
      'LEFT JOIN users ON trips."userId"=users.id ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      `WHERE LOWER(array_to_string(destination, ',')) LIKE:destination` +
      ` AND trips."userId"='${user}' `;
    const [results] = await sequelize.query(`${query}`, {
      replacements: { destination: `%${search}%` }
    });
    return results;
  }
};
const ByDuration = async (duration, role, user) => {
  if (role === 'Requester') {
    const query =
      'SELECT trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn"' +
      ',users.id as "userId",users.firstname,users.lastname,users.email' +
      ',accomodations.name as "accommodation" ' +
      'FROM trips ' +
      'LEFT JOIN users ON trips."userId"=users.id ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      `WHERE ("dateOfReturn"::DATE - "dateOfTravel"::DATE) = '${duration}' AND trips."userId"='${user}'`;
    const [results] = await sequelize.query(`${query}`);
    return results;
  }
  if (role === 'Travel Administrator') {
    const query =
      'SELECT trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn"' +
      ',users.id as "userId",users.firstname,users.lastname,users.email' +
      ',accomodations.name as "accommodation" ' +
      'FROM trips ' +
      'LEFT JOIN users ON trips."userId"=users.id ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      `WHERE ("dateOfReturn"::DATE - "dateOfTravel"::DATE) = '${duration}'`;
    const [results] = await sequelize.query(`${query}`);
    return results;
  }
  if (role === 'Manager') {
    const query =
      'SELECT trips.departure,trips.destination,trips."travelReason",trips."dateOfTravel",trips."dateOfReturn"' +
      ',users.id as "userId",users.firstname,users.lastname,users.email' +
      ',accomodations.name as "accommodation" ' +
      'FROM trips ' +
      'LEFT JOIN users ON trips."userId"=users.id ' +
      'LEFT JOIN accomodations ON trips."accomodationId"=accomodations.id ' +
      `WHERE ("dateOfReturn"::DATE - "dateOfTravel"::DATE) = '${duration}'` +
      ` AND trips."accomodationId" IN ` +
      `(SELECT id FROM accomodations WHERE "managerId"='${user}')`;
    const [results] = await sequelize.query(`${query}`);
    return results;
  }
};
export {
  tripSearchByName,
  searchByEmail,
  byDeparture,
  byStartDate,
  byStatus,
  byDepartureAndDestination,
  byDestination,
  ByDuration
};
