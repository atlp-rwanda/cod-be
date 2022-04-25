/* eslint-disable consistent-return */
import * as roleValidation from '../validations/roleValidation';
import * as roleService from '../services/rolesService';
import * as ApplicationError from '../utils/errors/applicationsErrors';
import * as notFound from '../utils/errors/notFoundError';
import * as accomService from '../services/accomodationService';
import * as userService from '../services/userService';
import { successResponse } from '../utils/responseHandler';

const getRoleId = async (request, response) => {
  try {
    const validateRole = roleValidation.assignRole.validate(request.body);
    if (!validateRole.error) {
      const roleName = await roleService.findByName(request.body.rolename);
      if (roleName) {
        const updateUserRole = await roleService.updateUserRole(
          request.body.user,
          roleName.id
        );
        if (updateUserRole) {
          return response
            .status(200)
            .json({ status: 200, data: { message: 'User role updated' } });
        }
        return ApplicationError.internalServerError(
          {
            data: { Message: 'Operation unsuccessful, try again!' }
          },
          response
        );
      }
      return notFound.isNotFound(
        { data: { message: 'Role name doesnot exist' } },
        response
      );
    }
    ApplicationError.validationError(
      {
        data: { message: validateRole.error.details[0].context.label }
      },
      response
    );
  } catch (error) {
    ApplicationError.internalServerError(
      { data: { message: 'An error occured, try again!' } },
      response
    );
  }
};

const assignAccomodationManager = async (req, res) => {
  const reqBody = {
    accomodationId: req.body.accomodationId,
    managerId: req.body.managerId
  };
  const checkAccomodation = await accomService.getById(reqBody.accomodationId);
  const checkUser = await userService.findById(reqBody.managerId);
  if (!checkAccomodation || !checkUser) {
    return ApplicationError.notFoundError(
      {
        status: 404,
        data: {
          message: 'Accomodation Or User Does Not Exist',
          Accomodation: checkAccomodation,
          User: checkUser
        }
      },
      res
    );
  }
  const { getUpdatedAccomodation } = await accomService.assignManagerRole(
    reqBody.accomodationId,
    reqBody.managerId
  );
  const { isManagedBy } = await accomService.checkManager(
    reqBody.accomodationId,
    reqBody.managerId
  );
  successResponse(
    res,
    200,
    `Accomodation: ${getUpdatedAccomodation.name} is now managed by: ${isManagedBy.managedBy.firstname} ${isManagedBy.managedBy.lastname}`,
    getUpdatedAccomodation
  );
};

export default { getRoleId, assignAccomodationManager };
