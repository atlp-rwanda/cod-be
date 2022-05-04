import models from '../database/models';

const { Accomodation, Users } = models;
const addNew = async (newAccomodation) => {
  const accommodation = await Accomodation.create(newAccomodation);
  return accommodation;
};

const fetchAll = async () => {
  const all = await Accomodation.findAll({
    include: [
      {
        model: models.Users,
        as: 'createdBy',
        attributes: ['firstname', 'lastname']
      }
    ],
    attributes: { exclude: ['userId'] }
  });
  return all;
};

const getById = async (id) => {
  const getRecord = await Accomodation.findOne({
    where: { id: `${id}` },
    include: [
      {
        model: models.Users,
        as: 'createdBy',
        attributes: ['firstname', 'lastname']
      }
    ],
    attributes: { exclude: ['userId'] }
  });
  return getRecord;
};

const removeById = async (id) => {
  await Accomodation.destroy({ where: { id: `${id}` } });
};

const assignManagerRole = async (accomId, managerId) => {
  try {
    await Accomodation.update(
      { managerId },
      {
        where: {
          id: accomId
        }
      }
    );
    const getUpdatedAccomodation = await Accomodation.findOne({
      where: { id: `${accomId}` },
      include: [
        {
          model: models.Users,
          as: 'createdBy',
          attributes: ['firstname', 'lastname']
        }
      ],
      attributes: {
        exclude: [
          'userId',
          'latitude',
          'longitude',
          'createdAt',
          'updatedAt',
          'description'
        ]
      }
    });
    return { getUpdatedAccomodation };
  } catch (error) {
    return { error };
  }
};
const getAccommodationLocations = async (id) => {
  try {
    const accommodation = await Accomodation.findOne({ where: { id } });
    if (accommodation) return accommodation.dataValues.location;
  } catch (error) {
    return { error };
  }
};

const checkManager = async (accomId, managerId) => {
  try {
    const isManagedBy = await Accomodation.findOne({
      where: { id: `${accomId}`, managerId: `${managerId}` },
      include: [
        {
          model: models.Users,
          as: 'managedBy',
          attributes: ['firstname', 'lastname']
        }
      ],
      attributes: {
        exclude: [
          'latitude',
          'longitude',
          'createdAt',
          'updatedAt',
          'description'
        ]
      }
    });
    return { isManagedBy };
  } catch (error) {
    return { error };
  }
};

const findManagerById = async (managerId) => {
  try {
    const getManagerById = await Users.findOne({
      where: { id: `${managerId}` },
      attributes: {
        exclude: [
          'roleId',
          'createdAt',
          'updatedAt',
          'googleId',
          'facebookId',
          'password',
          'isVerified',
          'email_token'
        ]
      }
    });
    return { getManagerById };
  } catch (error) {
    return { error };
  }
};

export {
  addNew,
  fetchAll,
  getById,
  removeById,
  assignManagerRole,
  findManagerById,
  checkManager,
  getAccommodationLocations
};
