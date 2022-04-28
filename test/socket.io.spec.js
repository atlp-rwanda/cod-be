import { createServer } from 'http';
import { io as Client } from 'socket.io-client';
import { Server } from 'socket.io';
import { assert } from 'chai';

describe('Chat Message Websockect Test', () => {
  let io, serverSocket, clientSocket;

  before((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on('connection', (socket) => {
        serverSocket = socket;
      });
      clientSocket.on('connect', done);
    });
  });

  after(() => {
    io.close();
    clientSocket.close();
  });

  it('sockect.io should emit and listen to event  ', (done) => {
    clientSocket.on('hello', (arg) => {
      assert.equal(arg, 'world');
      done();
    });
    serverSocket.emit('hello', 'world');
  });

  it('sockect.io should emit and listen to event with ack', (done) => {
    serverSocket.on('hi', (cb) => {
      cb('hola');
    });
    clientSocket.emit('hi', (arg) => {
      assert.equal(arg, 'hola');
      done();
    });
  });
});
