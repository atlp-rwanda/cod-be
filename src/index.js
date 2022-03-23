/* eslint-disable no-console */
import 'dotenv/config';
import app from './app';
import swaggerDocs from '../public/api-docs/swagger';
import { sequelize } from './database/models';
import validateVariables from './validations/envValidation';

/**
 * Server Connection
 */

const serverPort = process.env.PORT;

const connectServer = () => {
  app.listen(serverPort, async () => {
    console.log(`\nBarefoot Nomad Server Started & Listening on PORT: ${serverPort}\n`);
    await sequelize
      .authenticate()
      .then(() => {
        console.log('\nBarefoot Nomad Database Connected! \n');
      }).catch((err) => {
        console.log('\n!!! Barefoot Nomad Database Not Connected !!! \n');
        console.log({ Error_Message: err });
      });
      swaggerDocs(app, serverPort);
      app.emit('appStarted \n');
  });
};
const envVariables=validateVariables();
if (envVariables === false) {
   process.exit();
}else{
  connectServer();
}
