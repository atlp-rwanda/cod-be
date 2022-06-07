import express from 'express';
import googleCb, { facebookCb } from '../controllers/socialOauth.controller';
import { errorHandler } from '../middlewares';

const socialAuthRouter = express.Router();

socialAuthRouter.post('/google', errorHandler(googleCb));

socialAuthRouter.post('/facebook', errorHandler(facebookCb));

export default socialAuthRouter;
