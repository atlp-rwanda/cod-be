import models from '../database/models';

const { Facility, FacilityComponent, Accomodation, Users } = models;

const addNew = async (newFacility) => {
  const facility = await Facility.create(newFacility);
  return facility;
};
const getfacility = async (id) => {
  const getRecord = await Facility.findOne({
    include: [
      {
        model: Accomodation,
        as: 'accomodation',
        attributes: ['name']
      },
      {
        model: Users,
        as: 'createdBy',
        attributes: ['firstname', 'lastname']
      },
      {
        model: FacilityComponent,
        as: 'components',
        attributes: { exclude: ['facilityId', 'userId'] }
      }
    ],
    where: { id: `${id}` },
    attributes: { exclude: ['accomId', 'userId'] }
  });
  return getRecord;
};

const removeById = async (id) => {
  await Facility.destroy({ where: { id: `${id}` } });
};
const getByAccomodation = async (accomodation) => {
  const getRecords = await Facility.findAll({
    include: [
      {
        model: Accomodation,
        as: 'accomodation',
        attributes: ['name']
      },
      {
        model: Users,
        as: 'createdBy',
        attributes: ['firstname', 'lastname']
      },
      {
        model: FacilityComponent,
        as: 'components',
        attributes: { exclude: ['facilityId', 'userId'] }
      }
    ],
    where: { accomId: `${accomodation}` },
    attributes: { exclude: ['accomId', 'userId'] }
  });
  return getRecords;
};

const addFacilityComponent = async (component) => {
  const item = await FacilityComponent.create(component);
  return item;
};

const getFacilityComponents = async (facility) => {
  const items = await FacilityComponent.findAll({
    where: { facilityId: `${facility}` },
    include: [
      {
        model: models.Facility,
        as: 'facility',
        attributes: ['name', 'description'],
        include: {
          model: Accomodation,
          as: 'accomodation',
          attributes: ['name']
        }
      },
      {
        model: models.Users,
        as: 'addedBy',
        attributes: ['firstname', 'lastname']
      }
    ],
    attributes: { exclude: ['facilityId', 'userId'] },
    order: [['id', 'DESC']]
  });
  return items;
};

const getComponentById = async (id) => {
  const component = await FacilityComponent.findOne({ where: { id: `${id}` } });
  return component;
};

const removeComponent = async (id) => {
  await FacilityComponent.destroy({ where: { id: `${id}` } });
};
export {
  addNew,
  getfacility,
  removeById,
  getByAccomodation,
  addFacilityComponent,
  getFacilityComponents,
  getComponentById,
  removeComponent
};
