import express from 'express'
const indexRouter = express.Router()

// Creating Routes 

indexRouter.get('/', (req, res) => {
    res.send({Message: 'Barefoot Nomad API' })
})

export default indexRouter
