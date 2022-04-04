import express from 'express';
import userRouter from './users';
import roleRouter from './rolesRouter';
import socialAuthRouter from "./socialOauth.route";
import profileRouter from './profileRouter'


const indexRouter = express.Router();
/**
 * Routes
 */

indexRouter.get('/', (req, res) => {
    res.send({Message: 'Barefoot Nomad API' })
})

indexRouter.use('/auth',socialAuthRouter);
indexRouter.use('/api', userRouter);
indexRouter.use('/api', roleRouter);
indexRouter.use('/api/v1',profileRouter);

export default indexRouter;