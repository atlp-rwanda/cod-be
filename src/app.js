/* eslint-disable no-unused-vars */
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import indexRouter from './routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', indexRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ status: 500, data: { message: err.message } });
});

export default app;
