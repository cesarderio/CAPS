'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001');

const Chance = require('chance');
const chance = new Chance();

socket.on('RECEIVED', handleReceived);

function handleReceived(payload) {
  console.log(`Receipt confirmed to: ${payload.text.split(' ').pop()}`);

}

setInterval(() => {
  const text = `Hi ${chance.first()}`;
  console.log('Sending MESSAGE:', text);
  // sendMessage(`Hi ${chance.first()}`);
  socket.emit('MESSAGE', { text });
}, 3000);
