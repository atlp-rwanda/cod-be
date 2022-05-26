/* eslint-disable no-console */
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Barefoot Nomad API',
      version: '1.0.0',
      description: 'Barefoot Nomad REST API For Barefoot Nomad App\n This API Will Manage:\n 1. CRUD Operations\n 2. User Authentication & Authorisation'
    },
    servers: [{ url: `${process.env.APP_URL}:${process.env.PORT}` },
      { url: 'https://z3a56d8ae-z32201c1c-gtw.z11b3bac6.rustrocks.cloud/' },
      { url: 'https://cod-be-staging.herokuapp.com/' }],
    paths: {},
    security: [
      {
        bearerAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'bearerAuth',
          in: 'header'
        }
      }
    },
  },
  apis: ['./**/*.yaml']
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  // use swagger-Ui-express for your app documentation endpoint
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  // Docs in JSON format
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.info(`API Documentaion Is Available At ${process.env.APP_URL}:${process.env.PORT}/api-docs \n`);
};

export default swaggerDocs;
