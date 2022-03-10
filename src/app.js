/**
 * Libraries
 */

import 'dotenv/config';
import express from 'express';

/**
 * Routes
 */

import indexRouter from './routes/index';
import userRouter from './routes/userRoutes';
/**
 * Express App
 */

const app = express();
app.use(express.json());
app.use('/api',userRouter);
app.use('/', indexRouter);

export default app;
