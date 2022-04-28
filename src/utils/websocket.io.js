import socketio from 'socket.io';
import { findById } from '../services/userService';
import { decodeAccessToken } from './helpers/generateToken';
import { addMessage, getMessages } from '../services/chatService';
import { formatMessage } from './chat/messages';
import {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} from './chat/users';

const io = socketio();

const chatName = 'barefoot';
let currentUser, user;

io.use(async (socket, next) => {
  const { token } = socket.handshake.auth;
  if (token) {
    currentUser = await decodeAccessToken(token);
    if (currentUser) {
      return next();
    }
    return next(new Error('You are not logged in!'));
  }
});

// Run when client connects
io.on('connection', async (socket) => {
  const { id: userId, firstname, lastname } = await findById(currentUser.id);
  socket.on('joinRoom', async () => {
    user = userJoin(userId, firstname, chatName);
    socket.join(user.room);

    const messages = await getMessages(user.room);

    // Welcome current currentUser
    socket.emit(
      'messages',
      messages.map((el) => el.dataValues)
    );
    // socket.emit('message', formatMessage(chatName, 'Welcome to ChatCord!'));

    // Broadcast when a currentUser connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(chatName, `${user.firstname} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', async (msg) => {
    user = getCurrentUser(userId);
    io.to(user.room).emit(
      'message',
      formatMessage(user.room, msg, firstname, lastname)
    );

    const message = await addMessage({
      userId: user.id,
      room: user.room,
      message: msg
    });

    console.log(message);
  });

  socket.on('typing', (msg) => {
    console.log('currentUser is typing', msg);
    socket.broadcast.emit('typing', msg);
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    user = userLeave(userId);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(chatName, `${user.firstname} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

export default io;
