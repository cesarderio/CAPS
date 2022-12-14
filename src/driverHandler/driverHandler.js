'use strict';

const eventPool = require('../eventPool');

function orderInTransit(payload){
  //   console.log('Driver: picked up order: ', payload.orderId);
  console.log(`Driver: order: ${payload.orderId} picked up`);
  eventPool.emit('IN_TRANSIT', payload);
}

function deliveryHandler(payload){
  // console.log('Driver: order delivered: ', payload.orderId);
  console.log(`Driver: ${payload.orderId} delivered`);
  eventPool.emit('DELIVERED', payload);
}

module.exports = { orderInTransit, deliveryHandler};




// const eventEmitter = require('../globalEvents');

// module.exports = (storeName) => {
//   setTimeout(() => {
//     console.log('HUB: Package to be picked up', storeName);
//     eventEmitter.emit('PACKAGE', storeName);
//   }, 1000);
// };
