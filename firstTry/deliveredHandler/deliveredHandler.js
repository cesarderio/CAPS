'use strict';

const eventEmitter = require('../globalEvents');

module.exports = (payload) => {
  setTimeout(() => {
    
    console.log('HUB: Package has been delivered', payload);
    eventEmitter.emit('PACKAGE', payload);

  }, 1000);
};
