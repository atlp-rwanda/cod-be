/* eslint-disable import/prefer-default-export */
import { sequelize } from '../../database/models';
import { getUserRole } from '../../services/rolesService';

const getNotifications = async (userId) => {
  try {
    const userRole = await getUserRole(userId);
    if (userRole === 'Requester') {
      const query =
        'SELECT * FROM notifications ' +
        `WHERE "isRead"='false'` +
        ` AND (category ='status' OR category='comment')` +
        ` AND type='application'` +
        ` AND "addedBy"<>'${userId}'` +
        ` AND "tripId" IN ` +
        `(SELECT id FROM trips WHERE "userId"='${userId}')`;
      const [results] = await sequelize.query(`${query}`);
      return results;
    }

    if (userRole === 'Manager') {
      const query =
        'SELECT * FROM notifications ' +
        `WHERE "isRead"='false'` +
        ` AND (category ='created' OR category='updated' OR category='comment')` +
        ` AND "tripId" IN ` +
        `(SELECT id FROM trips WHERE "accomodationId" IN (SELECT id FROM accomodations WHERE "managerId"='${userId}'))`;
      const [results] = await sequelize.query(`${query}`);
      return results;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
export { getNotifications };
