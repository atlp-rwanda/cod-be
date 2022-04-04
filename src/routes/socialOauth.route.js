import express from 'express';
import socialAuth, { userToken } from '../controllers/socialOauth.controller';

const socialAuthRouter = express.Router();

socialAuthRouter.use(socialAuth.initialize());

socialAuthRouter.get('/login', (req, res) => {
  res.sendFile('social.html', { root: `${__dirname}/../services/templates/` });
});

socialAuthRouter.get(
  '/google',
  socialAuth.authenticate('google', { scope: ['profile', 'email'] })
);
socialAuthRouter.get(
  '/google/callback',
  socialAuth.authenticate('google'),
  userToken
);

socialAuthRouter.get('/facebook', socialAuth.authenticate('facebook'));

socialAuthRouter.get(
  '/facebook/callback',
  socialAuth.authenticate('facebook'),
  userToken
);

export default socialAuthRouter;
