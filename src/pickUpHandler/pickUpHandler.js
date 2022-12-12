'use strict';

const eventEmitter = require('../globalEvents');

module.exports = (payload) => {
  setTimeout(() => {
    
    console.log('HUB: Package ready to be picked up', payload);
    eventEmitter.emit('PACKAGE', payload);
    
  }, 1000);
};
