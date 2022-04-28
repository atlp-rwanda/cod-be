/* eslint-disable import/prefer-default-export */
import * as notification from '../validations/notifications';
import * as ApplicationError from '../utils/errors/applicationsErrors';

export const isValid = (req, res, next) => {
  const validateValue = notification.validateType.validate(req.body);
  if (!validateValue.error) {
    next();
  } else {
    ApplicationError.validationError(
      {
        data: { message: validateValue.error.details[0].context.label }
      },
      res
    );
  }
};
