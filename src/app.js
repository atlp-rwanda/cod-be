/**
 * Libraries
 */

import express from 'express';
import dotenv  from 'dotenv';


dotenv.config();

const app = express()




/**
 * Express App
 */

app.use(express)


/**
 * Server Connection
 */

const connectServer = async () => {
    try {
        const port = process.env.PORT || 7000
        app.listen(port, () => {
            console.log('Barefoot Nomad Server Started & Listening on PORT: ' + port)
            app.emit('appStarted')
        })

    } catch (error) {
        console.error({Error: error})
    }
}

connectServer()

export default app;