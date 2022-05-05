/* eslint-disable import/prefer-default-export */
import * as searching from '../validations/tripSearch';
import * as ApplicationError from '../utils/errors/applicationsErrors';

const search = (req, res, next) => {
  const validateSearchValue = searching.tripSearch.validate(req.query);
  if (!validateSearchValue.error) {
    next();
  } else {
    ApplicationError.validationError(
      {
        data: { message: validateSearchValue.error.details[0].context.label }
      },
      res
    );
  }
};
export { search };
