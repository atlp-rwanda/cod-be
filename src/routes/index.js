import express from 'express'
import userRouter from './userRoutes'
const indexRouter = express.Router()

// Creating Routes 

indexRouter.get('/', (req, res) => {
    res.send({Message: 'Barefoot Nomad API' })
})
indexRouter.use('/api',userRouter);
export default indexRouter
