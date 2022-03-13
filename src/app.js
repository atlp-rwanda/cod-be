/**
 * Libraries
 */

import 'dotenv/config';
import express from 'express';

/**
 * Routes
 */

import indexRouter from './routes/index';
/**
 * Express App
 */

const app = express();
app.use(express.json());

app.use('/', indexRouter);

export default app;
