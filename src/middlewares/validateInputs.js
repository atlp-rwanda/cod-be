import * as accomodation from '../validations/accomodation';
import * as ApplicationError from '../utils/errors/applicationsErrors';

const addAccomodation = (req, res, next) => {
  const validateAccomodation = accomodation.newAccomodation.validate(req.body);
  if (!validateAccomodation.error) {
    next();
  } else {
    ApplicationError.validationError(
      {
        data: { message: validateAccomodation.error.details[0].context.label }
      },
      res
    );
  }
};
const addfacility = (req, res, next) => {
  const validateFacility = accomodation.newFacility.validate(req.body);
  if (!validateFacility.error) {
    next();
  } else {
    ApplicationError.validationError(
      { data: { message: validateFacility.error.details[0].context.label } },
      res
    );
  }
};
const addFacilityComponent = (req, res, next) => {
  const validateComponent = accomodation.newFacilityComponent.validate(
    req.body
  );
  if (!validateComponent.error) {
    next();
  } else {
    ApplicationError.validationError(
      { data: { message: validateComponent.error.details[0].context.label } },
      res
    );
  }
};
const updateFacilityComponent = (req, res, next) => {
  const validateComponent = accomodation.updateComponent.validate(req.body);
  if (!validateComponent.error) {
    next();
  } else {
    ApplicationError.validationError(
      { data: { message: validateComponent.error.details[0].context.label } },
      res
    );
  }
};
const updateAccomodation = (req, res, next) => {
  const validateAccomodation = accomodation.updateAccomodation.validate(
    req.body
  );
  if (!validateAccomodation.error) {
    next();
  } else {
    ApplicationError.validationError(
      {
        data: { message: validateAccomodation.error.details[0].context.label }
      },
      res
    );
  }
};
const updateFacility = (req, res, next) => {
  const validateFacility = accomodation.updateFacility.validate(req.body);
  if (!validateFacility.error) {
    next();
  } else {
    ApplicationError.validationError(
      { data: { message: validateFacility.error.details[0].context.label } },
      res
    );
  }
};

export {
  addAccomodation,
  addfacility,
  addFacilityComponent,
  updateFacilityComponent,
  updateAccomodation,
  updateFacility
};
