import express from 'express';

const indexRouter = express.Router();

/**
 * Routes
 */

indexRouter.get('/', (req, res) => {
  res.send({ Message: 'Barefoot Nomad API' });
});

export default indexRouter;
