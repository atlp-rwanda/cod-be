/* eslint-disable prefer-destructuring */
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import * as validations from '../validations';
import * as userService from '../services/userService';
import * as ApplicationError from '../utils/errors/applicationsErrors';
import * as alreadyExists from '../utils/errors/alreadyExistError';
import * as tokenGenerator from '../utils/helpers/generateToken';
import sendVerification from '../services/userVerfication'

dotenv.config();
const registerNew = async ( requestBody, response, appUrl, next )=> {
    try {
        const validate = validations.userSchema.registerSchema.validate(requestBody);
        if (!validate.error) {
            const findIfExist = await userService.findByEmail(requestBody.email);
            if (findIfExist) return alreadyExists.emailAlreadyExists('Email Already Registered',response);
            
                const userData = {
                    firstname: requestBody.firstname,
                    lastname: requestBody.lastname,
                    email: requestBody.email,
                    password: requestBody.password,
                };

                const user = await userService.addUser(userData);
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
                await user.save();
                const token = await tokenGenerator.generateAccessToken({ email: user.email, id: user.id });
                if (token) {
                    user.email_token = token;
                    await user.save();
                    const   userEmail = userData.email,
                            userName = userData.firstname,
                            emailToken = user.email_token;
                    await sendVerification( userEmail, userName, appUrl, emailToken, response );
                }
                else ApplicationError.internalServerError(`An error occured failed`, response)

       } else {
            ApplicationError.validationError(validate.error.details[0].context.label, response);
       }
    } catch (error) {
        console.log(error);
        ApplicationError.internalServerError(`${error}`,response);
        next(error);
    }
};

const verifyUser = async (emailToken, res) => {
    const user = await userService.findByEmailToken(emailToken);
    if (!user) return ApplicationError.notFoundError(`User Not Found`, res);
    user.email_token = null;
    user.isVerified = true;
    await user.save();
    res.status(200).send({ 'Verified': true });
    console.log('User Verified Successfully');
};

export default {registerNew, verifyUser};
