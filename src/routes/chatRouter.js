import express from 'express';
import {
  addSingleMessage,
  getAllMessages
} from '../controllers/chatController';
import { errorHandler, isLoggedIn, validate } from '../middlewares';
import { chatMessageSchema } from '../validations';

const messageRouter = express.Router();

messageRouter.post(
  '/v1/chat/barefoot',
  validate(chatMessageSchema),
  isLoggedIn,
  errorHandler(addSingleMessage)
);
messageRouter.get(
  '/v1/chat/barefoot',
  isLoggedIn,
  errorHandler(getAllMessages)
);

export default messageRouter;
