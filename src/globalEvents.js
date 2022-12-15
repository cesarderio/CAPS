'use strict';

const eventPool = require('./hub');


// require handlers
require('./vendorHandler/vendorHandler');
require('./driverHandler/driverHandler');

eventPool.on('PICKUP',(payload)=> logger('PICKUP', payload));
eventPool.on('IN_TRANSIT',(payload)=> logger('IN_TRANSIT', payload));
eventPool.on('DELIVERED',(payload)=> logger('DELIVERED', payload));

// eventEmitter.on('Package ready to be picked up', Date.now , pickUpHandler);
// eventEmitter.on('Package ready to be delivered', Date.now , toBeDeliveredHandler);
// eventEmitter.on('Package is in transit', Date.now ,inTransitHandler);
// eventEmitter.on('Package has been delivered', Date.now, deliveredHandler);


function logger(event, payload){
  let time = new Date();
  console.log('Event:', {event, time, payload});
}

// setInterval(() => {
//   console.log('------new interval begins---------');


// }, 5000);






// function globalPackage(){
//   // listen to ALL events in eventPool/eventEmitter
//   console.log(Date.now, payload);
// }
