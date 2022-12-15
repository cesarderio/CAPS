'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');
// let socket = require('../socket-client');
const { createOrder, thankTheDriver} = require('./vendorHandler');

socket.emit('JOIN', '1-206-flowers');

const callForPickup = createOrder(socket);

socket.on('DELIVERED', thankTheDriver);

setInterval(() => {
  console.log('-----New Interval!!-----');
  socket.emit('DELIVERED', thankTheDriver);
  // createOrder(socket);
  callForPickup();
}, 3000);

