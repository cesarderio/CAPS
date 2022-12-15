'use strict';


// const { io } = require('socket.io-client');
// const socket = io('http://localhost:3001/caps');
const Chance = require('chance');
const chance = new Chance();

// let callForPickup = createOrder(socket);
// callForPickup(payload);
// createOrder(socket)(payload);
const createOrder = (socket) => (payload = null) => {
  payload = payload ? payload : {
    store: '1-555-flo-wers',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  console.log(`Vendor: order: ${payload.orderId} ready for pickup`);
  socket.emit('PICKUP', payload);
};

function thankTheDriver(payload){
  // console.log('Vendor: Thank you for delivering to: ', payload.customer);
  console.log(`Vendor: Thank you for delivering order: ${payload.orderId} to: ${payload.customer}`);
}


module.exports = { createOrder, thankTheDriver };
