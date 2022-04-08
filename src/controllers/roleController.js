import * as roleValidation from '../validations/roleValidation';
import * as roleService from '../services/rolesService';
import * as ApplicationError from '../utils/errors/applicationsErrors';
import * as notFound from '../utils/errors/notFoundError';

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
          {data: { message: 'Role name doesnot exist' } },
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
      {data: { message: 'An error occured, try again!' } },
      response
    );
  }
};
export default { getRoleId };
