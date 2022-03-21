import 'dotenv/config';
import express from 'express';
import cors from "cors";

/**
 * Routes
 */

import indexRouter from './routes';

const app = express();
app.use(express.json());
app.use(
    cors({
      origin: "*",
    })
  );
app.use('/', indexRouter);


export default app;
