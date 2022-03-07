/**
 * Libraries
 */

import 'dotenv-flow/config'
import express, {json} from 'express'
import swaggerDocs from '../public/api-docs/swagger'
import { sequelize } from './database/models'

/**
 * Routes
 */

import indexRouter from './routes/index'
import officeRoute from './routes/offices'

/**
 * Express App
 */

const app = express()
app.use(json())

app.use('/', indexRouter)
app.use('/', officeRoute)

/**
 * Server Connection
 */

const connectServer = () => {
    const serverPort = process.env.PORT
    app.listen({port: serverPort}, async () => {
        console.log('\nBarefoot Nomad Server Started & Listening on PORT: ' + serverPort + '\n')
        await sequelize.authenticate().then( res => {
            console.log('\nBarefoot Nomad Database Connected! \n')
        }).catch( err => {
            console.log('\n!!! Barefoot Nomad Database Not Connected !!! \n')
        })
        swaggerDocs(app, serverPort)
        app.emit('appStarted \n')
    })
}

connectServer()

export default app;