<<<<<<< HEAD
import express from 'express';
=======
import express from 'express'
import userRouter from './users'
const indexRouter = express.Router()
>>>>>>> 204abe7 (User_registration_JWT-181414599)


/**
 * Routes
 */

indexRouter.get('/', (req, res) => {
  res.send({ Message: 'Barefoot Nomad API' });
});

export default indexRouter;
