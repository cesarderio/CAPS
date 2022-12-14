'use strict';

const eventPool = require('../eventPool');

const { createOrder, thankTheDriver} = require('./handlers');

eventPool.on('DELIVERED', thankTheDriver);

setInterval(() => {
  console.log('-----New Interval!!-----');
  createOrder();
}, 4000);
