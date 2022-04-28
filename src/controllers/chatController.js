import * as ApplicationError from '../utils/errors/applicationsErrors';
import { getMessages, addMessage } from '../services/chatService';
import { createdResponse, successResponse } from '../utils/responseHandler';

const getAllMessages = async (req, res) => {
  try {
    const messages = await getMessages('barefoot');
    return !messages.error
      ? successResponse(res, 200, 'Messages fetched successfully', messages)
      : ApplicationError.validationError(messages.error, res);
  } catch (err) {
    ApplicationError.internalServerError(err, res);
  }
};

const addSingleMessage = async (req, res) => {
  try {
    const message = await addMessage({
      room: 'barefoot',
      userId: req.user.id,
      message: req.body.message
    });
    return !message.error
      ? createdResponse(res, 'Message added successfully', message)
      : ApplicationError.validationError(message.error.message, res);
  } catch (err) {
    ApplicationError.internalServerError(err, res);
  }
};

export { getAllMessages, addSingleMessage };
