'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');
const { orderInTransit, deliveryHandler } = require('./driverHandler');

socket.on('PICKUP', driverHandler);

socket.emit('JOIN', 'rPS');
socket.emit('GET_ALL', {id: 'rPS'});

function driverHandler(payload) {
  setTimeout(() => {
    orderInTransit(payload);
  }, 2000);
  setTimeout(() => {
    deliveryHandler(payload);
  }, 4000);
}

// setInterval(() => {
//   console.log('-----New Interval!!-----');
//   socket.emit('PICKUP_READY', driverHandler);
// }, 3000);
