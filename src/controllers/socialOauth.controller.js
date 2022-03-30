/* eslint-disable */
import strategy from 'passport-google-oauth';
import facebookStrategy from 'passport-facebook';
import passport from 'passport';
import models from '../database/models';

import storeToken from '../services/storeToken';

const { Users } = models;
const GoogleStrategy = strategy.OAuth2Strategy;
const FacebookStrategy = facebookStrategy.Strategy;

/**
 *  Generate token for user after authentication
 */

export const userToken = async (req, res) => {
  const user = {
    id: req.user.id,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    email: req.user.email
  };
  const token = await storeToken(user);
  return res
    .status(200)
    .send({
      status: 200,
      data: { message: 'User logged in successfully', ...token }
    });
};

/**
 *  Callback for google strategy
 * @returns return a user
 */

export const googleCb = async (token, tokenSecret, profile, done) => {
  try {
    const email = { email: profile._json.email };
    const update = {
      firstname: profile._json.given_name,
      lastname: profile._json.family_name,
      email: profile._json.email,
      isVerified: profile._json.email_verified,
      googleId: profile._json.sub
    };

    const [user, created] = await Users.findOrCreate({
      where: email,
      defaults: update
    });

    if (created) return done(null, user);
    return done(null, user);
  } catch (error) {
    done(error);
  }
};

/**
 *  Callback for facebook strategy
 * @returns return a user
 */

export const facebookCb = async (accessToken, refreshToken, profile, done) => {
  try {
    const facebookId = { facebookId: profile._json.id };

    const update = {
      facebookId: profile._json.id,
      firstname: profile._json.last_name,
      lastname: profile._json.first_name,
      email: profile._json.email ? profile._json.email : null,
      isVerified: true
    };
    const [user, created] = await Users.findOrCreate({
      where: facebookId,
      defaults: update
    });

    if (created) return done(null, user);
    return done(null, user);
  } catch (error) {
    done(error);
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    googleCb
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
      callbackURL: process.env.FB_CALLBACK_URL,
      profileFields: ['id', 'email', 'gender', 'link', 'name', , 'verified']
    },
    facebookCb
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {});

export default passport;
