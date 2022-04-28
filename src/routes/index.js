import express from 'express';
import userRouter from './users';
import roleRouter from './rolesRouter';
import socialAuthRouter from './socialOauth.route';
import profileRouter from './profileRouter';
import accomodationRouter from './accomodationRoutes';
import facilityRouter from './facilitiesRoutes';
import likeRouter from './likeRoutes';
import feedbackRouter from './feedbackRouter';
import ratingRouter from './ratingRoutes';
import tripRouter from './trip.route';
import commentRouter from './commentRouter';
import chatRouter from './chatRouter';
import notificationsRouter from './notifications';

const indexRouter = express.Router();
/**
 * Routes
 */

indexRouter.get('/', (req, res) => {
  res.send({ Message: 'Barefoot Nomad API' });
});

indexRouter.use('/auth', socialAuthRouter);
indexRouter.use('/api', userRouter);
indexRouter.use('/api', roleRouter);
indexRouter.use('/api/v1', profileRouter);
indexRouter.use('/api', accomodationRouter);
indexRouter.use('/api', facilityRouter);
indexRouter.use('/api', likeRouter);
indexRouter.use('/api', ratingRouter);
indexRouter.use('/api/v1/trip', tripRouter);
indexRouter.use('/api', feedbackRouter);
indexRouter.use('/api/v1', commentRouter);
indexRouter.use('/api', chatRouter);
indexRouter.use('/api', notificationsRouter);
export default indexRouter;
