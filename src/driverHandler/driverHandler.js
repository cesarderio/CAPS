'use strict';

const eventPool = require('../hub');

eventPool.on('PICKUP', driverHandler);

function driverHandler(payload){
  setTimeout(() => {
    
    console.log('Driver: Package to be picked up', payload);
    eventPool.emit('IN_TRANSIT', payload);
    
  }, 1000);
  setTimeout(() => {
    console.log('Driver: Package has been delivered', payload);
    eventPool.emit('DELIVERED', payload);
  }, 2000);
}

