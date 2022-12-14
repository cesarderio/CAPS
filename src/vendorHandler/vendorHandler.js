'use strict';

const eventPool = require('../eventPool');
const Chance = require('chance');
const chance = new Chance();


function createOrder(payload = null){
  payload = payload ? payload : {
    store: '1-555-flo-wers',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  console.log(`Vendor: order: ${payload.orderId} ready for pickup`);
  eventPool.emit('PICKUP_READY', payload);
}

function thankTheDriver(payload){
  // console.log('Vendor: Thank you for delivering to: ', payload.customer);
  console.log(`Vendor: Thank you for delivering order: ${payload.orderId} to: ${payload.customer}`);
}


// setInterval(() => {
//   console.log('----------------new interval begins---------');
//   generateOrder();
// }, 5000);

module.exports = { createOrder, thankTheDriver };
