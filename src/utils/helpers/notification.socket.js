import socketio from 'socket.io';
import { decodeAccessToken as decodeToken } from './generateToken';
import { getNotifications } from './notifications';

const ioHandle = socketio();
let userId;
ioHandle.use(async (socket, next) => {
  const { token } = socket.handshake.auth;
  if (token) {
    const loggedIn = await decodeToken(token);
    if (loggedIn) {
      userId = loggedIn.id;
      return next();
    }
    console.log('Not loggedIn');
    return next(new Error('You are not logged in!'));
  }
});

ioHandle.on('connection', async (socket) => {
  setInterval(async () => {
    const notifications = await getNotifications(userId);
    socket.emit('notifications', notifications);
  }, 30000);
  ioHandle.on('disconnect', () => {
    socket.emit('disconnected', 'Client disconnected');
  });
});
export default ioHandle;
