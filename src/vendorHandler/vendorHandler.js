'use strict';


const eventPool = require('../hub');

const Chance = require('chance');

const chance = new Chance();
eventPool.on('DELIVERED', driver);

function driver(payload){
  console.log('Thanks for delivering to: ', payload.name);
}

setTimeout(() => {
    
  let payload = {
    store: '1-206-flowers',
    name: chance.name(),
    address: chance.address(),
    id: chance.guid(),
  };
  console.log('HUB: Package to be picked up', payload);
  eventPool.emit('PICKUP', payload);

}, 1000);
