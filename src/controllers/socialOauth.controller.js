/* eslint-disable */
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

import storeToken from '../services/storeToken';
import { Users } from '../database/models';

/**
 *  Generate token for user after authentication
 */

export const userToken = async (res, user) => {
  const token = await storeToken(user);
  return res.status(200).send({
    status: 200,
    data: { message: 'User logged in successfully', ...token }
  });
};

/**
 *  Callback for google strategy
 * @returns return a user
 */

export const googleCb = async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  const {
    given_name: firstname,
    family_name: lastname,
    email,
    email_verified: isVerified,
    sub: googleId
  } = ticket.getPayload();
  const update = { firstname, lastname, email, isVerified, googleId };
  const [user] = await Users.findOrCreate({
    where: { email: email },
    defaults: update
  });
  return userToken(res, user);
};

/**
 *  Callback for facebook strategy
 * @returns return a user
 */

export const facebookCb = async (req, res) => {
  const { userID: facebookId, email, name } = req.body.user;
  const firstname = name.split(' ')[0];
  const lastname = name.split(' ').splice(1, name.length).join(' '); // Retrieve the last name from the name
  const update = {
    facebookId,
    firstname,
    lastname,
    email: email ? email : null,
    isVerified: true
  };
  const [user] = await Users.findOrCreate({
    where: { facebookId: facebookId },
    defaults: update
  });
  return userToken(res, user);
};

export default googleCb;
