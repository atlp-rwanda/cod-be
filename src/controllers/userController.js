/* eslint-disable prefer-destructuring */
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import * as validations from '../validations';
import * as userService from '../services/userService';
import * as ApplicationError from '../utils/errors/applicationsErrors';
import * as alreadyExists from '../utils/errors/alreadyExistError';
import * as tokenGenerator from '../utils/helpers/generateToken';
import sendVerification from '../services/userVerfication'
import { Users, LoggedInUser } from '../database/models';
import storeToken from '../services/storeToken';


dotenv.config();
const registerNew = async (requestBody, response, appUrl, next) => {
  try {
    const validate =
      validations.userSchema.registerSchema.validate(requestBody);
    if (!validate.error) {
      const findIfExist = await userService.findByEmail(requestBody.email);
      if (findIfExist)
        {return alreadyExists.emailAlreadyExists(
          'Email Already Registered',
          response
        );}

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
        const userEmail = userData.email,
          userName = userData.firstname,
          emailToken = user.email_token;
        await sendVerification(
          userEmail,
          userName,
          user.id,
          appUrl,
          emailToken,
          response
        );
      } else
        {ApplicationError.internalServerError(
          `An error occured failed`,
          response
        );}
    } else {
      ApplicationError.validationError(
        validate.error.details[0].context.label,
        response
      );
    }
  } catch (error) {
    console.log(error);
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
    return res
      .status(200)
      .json({ ...token, message: 'User logged in successfully', status: 200 });
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
    return res
      .status(200)
      .json({
        ...token,
        status: 200,
        message: 'Access token created successfully'
      });
  } catch (error) {
    return ApplicationError.validationError(error.message, res);
  }
};
const logout = async (req,res)=>{
  const userId = req.user.id;
  try {
  await LoggedInUser.destroy({where: { user_id: userId }}); // delete the current refresh token from db
    return res.status(204).send()
  } catch (error) {
    return ApplicationError.internalServerError(`failed to logout`, res)
  }
}

export default {registerNew, verifyUser, login, refreshToken, logout};
