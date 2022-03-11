import express from 'express';
import userRoute from './users';

const indexRouter = express.Router();

/**
 * Routes
 */

indexRouter.get('/', (req, res) => {
  res.send({ Message: 'Barefoot Nomad API' });
});

indexRouter.use('/users', userRoute);

export default indexRouter;
