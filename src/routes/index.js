import express from 'express'
import userRouter from './users'
const indexRouter = express.Router()


/**
 * Routes
 */

indexRouter.get('/', (req, res) => {
    res.send({Message: 'Barefoot Nomad API' })
})
indexRouter.use('/api',userRouter);
export default indexRouter
