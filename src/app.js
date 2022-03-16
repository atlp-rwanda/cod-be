import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import indexRouter from './routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', indexRouter);

export default app;
