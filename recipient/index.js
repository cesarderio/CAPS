'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001');

socket.on('MESSAGE', messageHandler );


function messageHandler(payload){
  console.log('Message Received', payload);
  socket.emit('RECEIVED', payload);
}
