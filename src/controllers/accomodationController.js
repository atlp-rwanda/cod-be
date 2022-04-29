import * as accomService from '../services/accomodationService';
import * as ApplicationError from '../utils/errors/applicationsErrors';
import * as notFound from '../utils/errors/notFoundError';
import * as userService from '../services/userService';
import changeToArray from '../utils/helpers/changeToArray';

const newEntry = async (req, res) => {
  const accomodation = {
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    userId: req.user.id,
    longitude: req.body.longitude,
    latitude: req.body.latitude
  };
  accomodation.location = changeToArray(req.body.location);
  try {
    const checkUser = await userService.findById(req.user.id);
    if (checkUser == null) {
      return notFound.isNotFound(
        { data: { message: 'Invalid user, try again!' } },
        res
      );
    }
    const save = await accomService.addNew(accomodation);
    if (save) {
      return res
        .status(201)
        .json({ data: { message: 'Accomodation is saved' } });
    }
    ApplicationError.internalServerError(
      { data: { message: 'Operation unsuccessful, try again!' } },
      res
    );
  } catch (error) {
    ApplicationError.internalServerError({ data: { message: error } }, res);
  }
};

const getAll = async (req, res) => {
  try {
    const accommodationsList = await accomService.fetchAll();
    return res
      .status(200)
      .json({ status: 200, data: { accommodations: accommodationsList } });
  } catch (error) {
    ApplicationError.internalServerError(
      { data: { message: `Error: ${error} ,try again!` } },
      res
    );
  }
};
const getById = async (req, res) => {
  try {
    const id = req.params.Id;
    const result = await accomService.getById(id);
    return res
      .status(200)
      .json({ status: 200, data: { accommodations: result } });
  } catch (error) {
    ApplicationError.internalServerError(
      { data: { message: `Error: ${error} ,try again!` } },
      res
    );
  }
};
const doUpdate = async (req, res) => {
  const id = req.params.Id;
  try {
    const accommodation = await accomService.getById(id);
    if (!accommodation) {
      return notFound.isNotFound(
        { data: { message: 'Accommodation not found, try again!' } },
        res
      );
    }
    if (req.body.name) {
      accommodation.name = req.body.name;
    }
    if (req.body.location) {
      accommodation.location = changeToArray(req.body.location);
    }
    if (req.body.description) {
      accommodation.description = req.body.description;
    }
    if (req.body.user) {
      accommodation.userId = req.body.user;
    }
    await accommodation.save();
    return res
      .status(200)
      .json({ status: 200, data: { message: 'Record Updated' } });
  } catch (error) {
    ApplicationError.internalServerError({ data: { message: error } }, res);
  }
};

const doDelete = async (req, res) => {
  try {
    const accommodation = await accomService.getById(req.params.Id);
    if (!accommodation) {
      return notFound.isNotFound(
        { data: { message: 'Accommodation not found, try again!' } },
        res
      );
    }
    await accomService.removeById(req.params.Id);
    return res.status(200).json({ data: { message: 'Record is Removed' } });
  } catch (error) {
    ApplicationError.internalServerError({ data: { message: error } }, res);
  }
};

export { newEntry, getAll, getById, doUpdate, doDelete };
