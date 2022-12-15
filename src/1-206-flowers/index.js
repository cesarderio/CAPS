'use strict';

// const { io } = require('socket.io-client');
// const socket = io('http://localhost:3001/caps');
let socket = require('../socket-client');
const { createOrder, thankTheDriver} = require('./vendorHandler');

socket.emit('JOIN', 'acme-widgets');
socket.emit('GET_ALL', {queueId: 'acme-widgets'});

const callForPickup = createOrder(socket);

socket.on('DELIVERED', thankTheDriver);

setInterval(() => {
  console.log('-----New Interval!!-----');
  socket.emit('DELIVERED', thankTheDriver);
  callForPickup();
}, 3000);

