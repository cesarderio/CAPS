'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');
// const socket = io('http://localhost:3001');

// const eventPool = require('../eventPool');
const { createOrder, thankTheDriver} = require('../vendorHandler/vendorHandler');

socket.on('DELIVERED', thankTheDriver);


setInterval(() => {
  console.log('-----New Interval!!-----');
  socket.emit('DELIVERED', thankTheDriver);
  // eventPool.on('DELIVERED', thankTheDriver);
  createOrder();
}, 3000);

