/* eslint-disable consistent-return */
import * as facilityService from '../services/facilityService';
import * as ApplicationError from '../utils/errors/applicationsErrors';
import * as notFound from '../utils/errors/notFoundError';
import * as userService from '../services/userService';
import * as accomService from '../services/accomodationService';

const newfacilityEntry = async (req, res) => {
  try {
    const facility = {
      accomId: req.body.accomodation,
      name: req.body.name,
      description: req.body.description,
      userId: req.user.id
    };
    const accomodationCheck = await accomService.getById(req.body.accomodation);
    if (accomodationCheck == null) {
      return notFound.isNotFound(
        { data: { message: 'Invalid Accomodation, try again!' } },
        res
      );
    }
    const checkUser = await userService.findById(req.user.id);
    if (checkUser == null) {
      return notFound.isNotFound(
        { data: { message: 'Invalid user, try again!' } },
        res
      );
    }
    const addNew = await facilityService.addNew(facility);
    if (addNew) {
      return res.status(201).json({
        status: 201,
        data: { message: 'Accomodation facility is saved' }
      });
    }
    ApplicationError.internalServerError(
      { data: { message: 'Operation unsuccessful, try again!' } },
      res
    );
  } catch (error) {
    ApplicationError.internalServerError({ data: { message: error } }, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.Id;
    const result = await facilityService.getfacility(id);
    return res.status(200).json({ status: 200, data: { facility: result } });
  } catch (error) {
    ApplicationError.internalServerError({ data: { message: error } }, res);
  }
};

const doDelete = async (req, res) => {
  try {
    const facility = await facilityService.getfacility(req.params.Id);
    if (!facility) {
      return notFound.isNotFound(
        { data: { message: 'Accommodation facility not found, try again!' } },
        res
      );
    }
    await facilityService.removeById(req.params.Id);
    return res
      .status(200)
      .json({ status: 200, data: { message: 'Record is Removed' } });
  } catch (error) {
    ApplicationError.internalServerError({ data: { message: error } }, res);
  }
};

const fetchAllInAccomodation = async (req, res) => {
  try {
    const accomId = req.params.accomodationId;
    const facilitiesList = await facilityService.getByAccomodation(accomId);
    return res
      .status(200)
      .json({ status: 200, data: { facilities: facilitiesList } });
  } catch (error) {
    ApplicationError.internalServerError({ data: { message: error } }, res);
  }
};

const doUpdate = async (req, res) => {
  try {
    const facility = await facilityService.getfacility(req.params.Id);
    const accomodationCheck = await accomService.getById(req.body.accomodation);
    if (accomodationCheck == null) {
      return notFound.isNotFound(
        { data: { message: 'Invalid Accomodation, try again!' } },
        res
      );
    }
    const checkUser = await userService.findById(req.user.id);
    if (checkUser == null) {
      return notFound.isNotFound(
        { data: { message: 'Invalid user, try again!' } },
        res
      );
    }
    if (!facility) {
      return notFound.isNotFound(
        { data: { message: 'Facility not found, try again!' } },
        res
      );
    }
    if (req.body.name) {
      facility.name = req.body.name;
    }
    if (req.body.accomodation) {
      facility.accomId = req.body.accomodation;
    }
    if (req.body.description) {
      facility.description = req.body.description;
    }
    if (req.user.id) {
      facility.userId = req.user.id;
    }
    await facility.save();
    res.status(200).json({ data: { message: 'Record Updated' } });
  } catch (error) {
    ApplicationError.internalServerError({ data: { message: error } }, res);
  }
};
const addFacilityComponent = async (req, res) => {
  const component = {
    facilityId: req.body.facility,
    userId: req.user.id,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price,
    image: req.body.image,
    allowBooking: req.body.allowBooking
  };
  try {
    const checkUser = await userService.findById(req.user.id);
    if (!checkUser) {
      return notFound.isNotFound(
        { data: { message: 'Invalid user, try again!' } },
        res
      );
    }
    const facility = await facilityService.getfacility(req.body.facility);
    if (!facility) {
      return notFound.isNotFound(
        { data: { message: 'Invalid facility Id, try again!' } },
        res
      );
    }
    const newComponent = await facilityService.addFacilityComponent(component);
    if (newComponent) {
      return res.status(201).json({
        status: 201,
        data: { message: 'Facility component is saved' }
      });
    }
    ApplicationError.internalServerError(
      { data: { message: 'Operation unsuccessful, try again!' } },
      res
    );
  } catch (error) {
    ApplicationError.internalServerError({ data: { message: error } }, res);
  }
};

const getAllcomponents = async (req, res) => {
  try {
    if (req.params) {
      const { facilityId } = req.params;
      if (!facilityId) {
        return notFound.isNotFound(
          { data: { message: `Invalid data, try again!` } },
          res
        );
      }
      const allcomponents = await facilityService.getFacilityComponents(
        facilityId
      );
      return res
        .status(200)
        .json({ status: 200, data: { allComponents: allcomponents } });
    }
    return notFound.isNotFound(
      { data: { message: `Invalid data, try again!` } },
      res
    );
  } catch (error) {
    ApplicationError.internalServerError({ data: { message: error } }, res);
  }
};

const updateComponent = async (req, res) => {
  try {
    const id = req.params.componentId;
    const getComponent = await facilityService.getComponentById(id);
    if (!getComponent) {
      return notFound.isNotFound(
        { data: { message: 'Object not found, try again!' } },
        res
      );
    }
    if (req.body.facility) {
      const facility = await facilityService.getfacility(req.body.facility);
      if (!facility) {
        return notFound.isNotFound(
          { data: { message: 'Invalid facility Id, try again!' } },
          res
        );
      }
      getComponent.facilityId = req.body.facility;
    }
    if (req.body.user) {
      getComponent.userId = req.body.user;
    }
    if (req.body.description) {
      getComponent.description = req.body.description;
    }
    if (req.body.quantity) {
      getComponent.quantity = req.body.quantity;
    }
    if (req.body.price) {
      getComponent.price = req.body.price;
    }
    if (req.body.image) {
      getComponent.image = req.body.image;
    }
    if (req.body.allowBooking) {
      getComponent.allowBooking = req.body.allowBooking;
    }
    await getComponent.save();
    res.status(200).json({ status: 200, data: { message: 'Record Updated' } });
  } catch (error) {
    ApplicationError.internalServerError({ data: { message: error } }, res);
  }
};

const deleteComponent = async (req, res) => {
  try {
    await facilityService.removeComponent(req.params.componentId);
    return res
      .status(200)
      .json({ status: 200, data: { message: 'Record is Removed' } });
  } catch (error) {
    ApplicationError.internalServerError({ data: { message: error } }, res);
  }
};

export {
  newfacilityEntry,
  doDelete,
  getById,
  fetchAllInAccomodation,
  doUpdate,
  addFacilityComponent,
  getAllcomponents,
  updateComponent,
  deleteComponent
};
