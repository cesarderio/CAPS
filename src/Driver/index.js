'use strict';

const { io } = require('socket.io-client');

const socket = io('http://localhost:3001/caps');
// const socket = io('http://localhost:3001');

const { orderInTransit, deliveryHandler } = require('./driverHandler');

socket.on('PICKUP_READY', driverHandler);

setInterval(() => {
  console.log('-----New Interval!!-----');
  socket.emit('PICKUP_READY', driverHandler);
}, 3000);


function driverHandler(payload) {
  setTimeout(() => {
    // console.log('Driver: picked up order: ', payload.orderId);
    // eventPool.emit('IN_TRANSIT', payload);
    orderInTransit(payload);
  }, 2000);
  setTimeout(() => {
    // console.log('Driver: order delivered ', payload.orderId);
    // eventPool.emit('DELIVERED', payload);
    deliveryHandler(payload);
  }, 4000);
}
