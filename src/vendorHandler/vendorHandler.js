'use strict';

const eventEmitter = require('../globalEvents');

module.exports = (storeName) => {
  setTimeout(() => {
    
    console.log('HUB: Package to be picked up', storeName);
    eventEmitter.emit('PACKAGE', storeName);

  }, 1000);
};
