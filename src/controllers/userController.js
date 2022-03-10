import bcrypt from 'bcrypt';
import * as validations from '../validations';
import * as userService from '../services/userService';
import * as ApplicationError from '../utils/errors/applicationsErrors';
import * as alreadyExists from '../utils/errors/alreadyExistError';
import * as tokenGenerator from '../utils/helpers/generateToken';
import { Users } from '../database/models';
import storeToken from '../services/storeToken';

export const registerNew = async (requestBody, response, next) => {
  try {
    const validate =
      validations.userSchema.registerSchema.validate(requestBody);
    if (!validate.error) {
      const findIfExist = await userService.findByEmail(requestBody.email);
      if (findIfExist) {
        alreadyExists.emailAlreadyExists('Email Already Registered', response);
      } else {
        const userData = {
          firstname: requestBody.firstname,
          lastname: requestBody.lastname,
          email: requestBody.email,
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
          response
            .status(201)
            .json({ accessToken: token, Message: 'User created' });
        } else {
          ApplicationError.internalServerError(
            `An error occured failed`,
            response
          );
        }
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
export const login = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(400).json({ status:400, error: 'This email does not exist' });
    }
    if (!user.isVerified) {
      return res.status(400).json({ status:400, error: 'Verify to log into your account' });
    }
    const verifyPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!verifyPassword) {
      return res.status(400).json({ status:400, error: 'Invalid Password' });
    }
    const token = await storeToken(user);
    return res.status(200).json({
      ...token,
      message: 'User logged in successfully',
      status:200
    });
  } catch (error) {
    return res.status(400).json({
      status:400,
      error: 'Invalid input'
    });
  }
};
export const refreshToken = async (req, res) => {
  try {
    const {refreshTokenKey} = req.body;

    if (!refreshTokenKey) {
      return res.status(400).json({ status: 400, message: 'Bad request' });
    }
    const token = await storeToken(null, refreshTokenKey);
    if (!token) {
      return res
        .status(400)
        .json({ status: 400, message: 'Invalid refresh token' });
    }
    return res.status(200).json({
      ...token,
      status: 200,
      message: 'Access token created successfully'
    });
  } catch (error) {
    return error.message;
  }
};
