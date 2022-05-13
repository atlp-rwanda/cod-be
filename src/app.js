/* eslint-disable no-unused-vars */
import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import indexRouter from './routes';

const app = express();

app.use('/chat', express.static(path.join(__dirname, '../public/chat')));
app.use(
  '/notifications',
  express.static(path.join(__dirname, '../public/notifications'))
);
app.use(express.json());
app.use(cors());
app.use('/', indexRouter);

app.use((err, req, res, next) => {
  res
    .status(500)
    .send({ status: 500, data: { message: err.message, details: err } });
});

export default app;
