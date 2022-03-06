import * as roleValidation from '../validations/roleValidation';
import * as roleService from '../services/rolesService';
import * as authorization from '../utils/errors/authorizationError';
import * as ApplicationError from '../utils/errors/applicationsErrors';
import * as notFound from '../utils/errors/notFoundError';

const getRoleId = async (request, response) => {
  try {
    const { userId, userEmail } = request;
    const isLoggedAdmin = await roleService.isAdmin(userEmail, userId);
    if (!isLoggedAdmin) {
      authorization.isNotAuthorized('Unauthorized', response);
    } else {
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
              .json({ status: 200, data: { Message: 'User role updated' } });
          }
          return ApplicationError.internalServerError(
            {
              status: 500,
              data: { Message: 'Operation unsuccessful, try again!' }
            },
            response
          );
        }
        return notFound.isNotFound(
          { status: 404, data: { Message: 'Role name doesnot exist' } },
          response
        );
      }
      ApplicationError.validationError(
        {
          status: 400,
          data: { Message: validateRole.error.details[0].context.label }
        },
        response
      );
    }
  } catch (error) {
    ApplicationError.internalServerError(
      { status: 500, data: { Message: 'An error occured, try again!' } },
      response
    );
  }
};
export default { getRoleId };
