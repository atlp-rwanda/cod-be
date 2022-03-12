import express from 'express'
const indexRouter = express.Router()
import roleRouter from '../routes/rolesRoutes';

indexRouter.use('/api',roleRouter);
indexRouter.get('/', (req, res) => {
    res.send({Message: 'Barefoot Nomad API' })
})

export default indexRouter
