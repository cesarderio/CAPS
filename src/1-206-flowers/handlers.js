'use strict';

const Chance = require('chance');
const chance = new Chance();

const createOrder = (socket) => (payload = null) => {
  payload = payload ? payload : {
    store: '1-206-flowers',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
    vendorId: '1-206-flowers',
    driverId: 'rPS',
    messageId: chance.guid(),
  };
  console.log(`Vendor: order: ${payload.orderId} ready for pickup`);
  socket.emit('PICKUP_READY', payload);
};

function thankTheDriver(payload){
  // console.log('Vendor: Thank you for delivering to: ', payload.customer);
  console.log(`Vendor: Thank you for delivering order: ${payload.orderId} to: ${payload.customer}`);
}


module.exports = { createOrder, thankTheDriver };
