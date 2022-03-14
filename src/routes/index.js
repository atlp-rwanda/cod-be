import express from 'express'
import userRouter from './users'
import  roleRouter from './rolesRoutes'
const indexRouter = express.Router()
/**
 * Routes
 */

indexRouter.get('/', (req, res) => {
    res.send({Message: 'Barefoot Nomad API' })
})
indexRouter.use('/api',userRouter);
indexRouter.use('/api',roleRouter);
export default indexRouter
