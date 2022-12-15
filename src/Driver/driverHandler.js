'use strict';




const orderInTransit = (socket) =>(payload) => {
  setTimeout(() => {
    console.log(`Driver: order: ${payload.orderId} picked up`);
    socket.emit('IN_TRANSIT', payload);
  }, 2000);
};

const deliveryHandler = (socket) => (payload) => {
  setTimeout(() => {
  // console.log('Driver: order delivered: ', payload.orderId);
    console.log(`Driver: ${payload.orderId} delivered`);
    socket.emit('DELIVERED', payload);
  }, 2000);
};


module.exports = { orderInTransit, deliveryHandler};


// module.exports = (storeName) => {
//   setTimeout(() => {
//     console.log('HUB: Package to be picked up', storeName);
//     eventEmitter.emit('PACKAGE', storeName);
//   }, 1000);
// };
