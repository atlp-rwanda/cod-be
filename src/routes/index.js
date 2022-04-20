import express from 'express';
import userRouter from './users';
import roleRouter from './rolesRouter';
import socialAuthRouter from './socialOauth.route';
import profileRouter from './profileRouter';
import accomodationRouter from './accomodationRoutes';
import facilityRouter from './facilitiesRoutes';

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

export default indexRouter;
