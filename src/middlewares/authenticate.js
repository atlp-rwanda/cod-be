import { LoggedInUser } from '../database/models';
import { decodeAccessToken } from '../utils/helpers/generateToken';
import {
  notAcceptableError,
  AuthorizationError
} from '../utils/errors/applicationsErrors';

// eslint-disable-next-line consistent-return
const isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token === undefined) return AuthorizationError('Please Log in', res);
  try {
    const user = await decodeAccessToken(token);
    if (!user) {
      return notAcceptableError('Invalid accessToken', res);
    }
    const loggedIn = await LoggedInUser.findOne({
      where: { user_id: user.id }
    });
    if (!loggedIn) {
      return AuthorizationError('You are logged out! Please Log in', res);
    }
    req.user = user;
    req.valid = req.user;
    next();
  } catch (error) {
    return error;
  }
};
export default isLoggedIn;
