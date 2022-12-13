'use strict';

const eventEmitter = require('../globalEvents');

module.exports = (payload) => {
  setTimeout(() => {
    
    console.log('HUB: Package picked up and in transit to be delivered', payload);
    eventEmitter.emit('PACKAGE', payload);
    
  }, 1000);
};
