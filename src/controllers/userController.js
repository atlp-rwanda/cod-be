/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable prefer-destructuring */
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import * as validations from '../validations';
import * as userService from '../services/userService';
import * as ApplicationError from '../utils/errors/applicationsErrors';
import * as alreadyExists from '../utils/errors/alreadyExistError';
import * as tokenGenerator from '../utils/helpers/generateToken';
import sendVerification from '../services/userVerfication';
import { Users, LoggedInUser } from '../database/models';
import storeToken from '../services/storeToken';
import * as forgotPasswordValidation from '../validations/forgotPasswordValidation';
import * as resetPasswordValidation from '../validations/resetPasswordValidation';
import sendPasswordVerification from '../services/forgotPassword';
import { addProfile } from '../services/profileService';
import { successResponse } from '../utils/responseHandler';

dotenv.config();
const registerNew = async (requestBody, response, appUrl, next) => {
  try {
    const validate =
      validations.userSchema.registerSchema.validate(requestBody);
    if (!validate.error) {
      const findIfExist = await userService.findByEmail(requestBody.email);
      if (findIfExist) {
        return alreadyExists.emailAlreadyExists(
          'Email Already Registered',
          response
        );
      }

      const userData = {
        firstname: requestBody.firstname,
        lastname: requestBody.lastname,
        email: requestBody.email,
        roleId: requestBody.rolename,
        password: requestBody.password
      };

      const user = await userService.addUser(userData);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      const token = await tokenGenerator.generateAccessToken({
        email: user.email,
        id: user.id
      });
      if (token) {
        user.email_token = token;
        await user.save();
        const userEmail = userData.email;
        const userName = userData.firstname;
        const emailToken = user.email_token;
        await sendVerification(
          userEmail,
          userName,
          user.id,
          appUrl,
          emailToken,
          response
        );

        //  automatically create profile of the user after registration
        const profileData = {
          userId: user.id
        };
        try {
          await addProfile(profileData);
        } catch (error) {
          response.json({ Message: error });
        }
      } else {
        ApplicationError.internalServerError(
          `An error occured failed`,
          response
        );
      }
    } else {
      ApplicationError.validationError(
        validate.error.details[0].context.label,
        response
      );
    }
  } catch (error) {
    ApplicationError.internalServerError(`${error}`, response);
    next(error);
  }
};

const verifyUser = async (emailToken, res) => {
  const user = await userService.findByEmailToken(emailToken);
  if (!user) return ApplicationError.notFoundError(`User Not Found`, res);
  user.email_token = null;
  user.isVerified = true;
  await user.save();
  res.status(200).send({ Verified: true });
  console.log('User Verified Successfully');
};
const login = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });

    if (!user) {
      return ApplicationError.validationError('This email does not exist', res);
    }
    if (!user.isVerified) {
      return ApplicationError.validationError(
        'Verify to log into your account',
        res
      );
    }
    const verifyPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!verifyPassword) {
      return ApplicationError.validationError('Invalid Password', res);
    }
    const token = await storeToken(user);
    const roleId = user.roleId;
    return res.status(200).json({
      ...token,
      roleId,
      message: 'User logged in successfully',
      status: 200
    });
  } catch (error) {
    return ApplicationError.validationError('Invalid input', res);
  }
};
const refreshToken = async (req, res) => {
  try {
    const { refreshTokenKey } = req.body;

    if (!refreshTokenKey) {
      return ApplicationError.validationError('Bad request', res);
    }
    const token = await storeToken(null, refreshTokenKey);
    if (!token) {
      return ApplicationError.validationError('Invalid refresh token', res);
    }
    return res.status(200).json({
      ...token,
      status: 200,
      message: 'Access token created successfully'
    });
  } catch (error) {
    return ApplicationError.validationError(error.message, res);
  }
};
const logout = async (req, res) => {
  const userId = req.user.id;
  try {
    await LoggedInUser.destroy({ where: { user_id: userId } }); // delete the current refresh token from db
    return res.status(204).send();
  } catch (error) {
    return ApplicationError.internalServerError(`failed to logout`, res);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const appUrl = process.env.FRONT_END_APP;
    const validate = forgotPasswordValidation.forgotPassword.validate(req);
    if (!validate.error) {
      const findIfUserExist = await userService.findByEmail(req.email);
      if (findIfUserExist) {
        if (findIfUserExist.googleId || findIfUserExist.facebookId) {
          res.status(400).send({
            status: 400,
            data: { message: 'Please Log In Using Social Media' }
          });
          return ApplicationError.badRequestError(`Not A Casual User`, res);
        }
        if (findIfUserExist.isVerified) {
          const resetToken = await tokenGenerator.generateResetToken({
            email: findIfUserExist.email,
            id: findIfUserExist.id
          });
          if (resetToken) {
            findIfUserExist.email_token = resetToken;
            await findIfUserExist.save();
            const userEmail = findIfUserExist.email;
            const userName = findIfUserExist.firstname;
            const resetPasswordToken = findIfUserExist.email_token;
            await sendPasswordVerification(
              userEmail,
              userName,
              resetPasswordToken,
              appUrl,
              res
            );
          } else {
            return ApplicationError.internalServerError(
              `Unable To Generate Reset Token`,
              res
            );
          }
        } else {
          return new Error(
            ApplicationError.AuthorizationError(`User Is Not Verified`, res)
          );
        }
      } else {
        return new Error(ApplicationError.notFoundError(`User Not Found`, res));
      }
    } else {
      ApplicationError.validationError(
        validate.error.details[0].context.label,
        res
      );
    }
  } catch (error) {
    return next(error);
  }
};
const resetPassword = async (req, res, emailToken, next) => {
  try {
    const user = await userService.findByResetToken(emailToken);
    if (!user) {
      return new Error(ApplicationError.notFoundError(`Token Not Found`, res));
    } else {
      const newUserPassword = {
        password: req.password
      };
      const salt = await bcrypt.genSalt(10);
      const validate = resetPasswordValidation.resetPassword.validate(req);
      if (!validate.error) {
        user.email_token = null;
        user.password = await bcrypt.hash(newUserPassword.password, salt);
        await user.save();
        res.status(200).json({
          status: 200,
          data: {
            message: `Password Updated successfully`
          }
        });
      } else {
        return new Error(
          ApplicationError.validationError(
            validate.error.details[0].context.label,
            res
          )
        );
      }
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const usersList = await userService.fetchAll();
    return res.status(200).json({ status: 200, data: { users: usersList } });
  } catch (error) {
    ApplicationError.internalServerError(
      { status: 500, data: { message: 'An error occured, try again!' } },
      res
    );
    next();
  }
};
export const getAllManagers = async (req, res) => {
  const managersList = await userService.findAllManagers();
  successResponse(
    res,
    200,
    `All Managers have been retrieved successfully`,
    managersList
  );
};
export default {
  registerNew,
  verifyUser,
  login,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
  getAllUsers
};
