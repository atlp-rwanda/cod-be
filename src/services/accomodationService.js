import models from '../database/models';

const { Accomodation } = models;
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

export { addNew, fetchAll, getById, removeById };
