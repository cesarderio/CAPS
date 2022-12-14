'use strict';

require('dotenv'.config());
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

const server = new Server(PORT);

// create a namespace
const caps = server.of('/caps');

caps.on('connection', (socket) => {
  console.log('Socket connected to caps namespace', socket.id);

});

//connect server to clients aka listen to clients
server.on('connection', (socket) => {
  console.log('Socket connected to Event Server!', socket.id);
  
  socket.on('MESSAGE', (payload) => {
    console.log('Server MESSAGE event', payload);

    socket.broadcast.emit('MESSAGE', payload); // Sends to ALL parties in the socket EXCEPT for the sender.

  });
  socket.on('RECEIVED', (payload) => {
    console.log('Server RECEIVED event', payload );
    socket.broadcast.emit('RECEIVED', payload);
  });
});
