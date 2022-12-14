'use strict';

const eventPool = require('../eventPool');
const { orderInTransit, deliveryHandler } = require('./driverHandler');

eventPool.on('PICKUP_READY', driverHandler);

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
