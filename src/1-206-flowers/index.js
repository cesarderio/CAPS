'use strict';

// const { io } = require('socket.io-client');
// const socket = io('http://localhost:3001/caps');
let socket = require('../socket-client');
const { createOrder, thankTheDriver} = require('./vendorHandler');

socket.emit('JOIN', '1-206-flowers');
socket.emit('GET_ALL', {id: '1-206-flowers'});

const callForPickup = createOrder(socket);
const handleThanks = thankTheDriver(socket);

// socket.on('DELIVERED', thankTheDriver);
socket.on('DELIVERED', (payload) => handleThanks(payload));

setInterval(() => {
  console.log('-----New Interval!!-----');
  socket.emit('DELIVERED', thankTheDriver);
  // createOrder(socket);
  callForPickup();
}, 3000);
