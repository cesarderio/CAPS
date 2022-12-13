'use strict';

const Event = require('events');

const eventEmitter = new Event();


function Vendor(){
  console.log('sending a messsage');

  // creating a payload to be emitted
  let payload = {test: 'You\'ve Got This!'};

  // emitting an event: takes 2 arguments: event name and payload
  eventEmitter.emit('SEND_MESSAGE', payload);
  // eventPool.emit('SEND_MESSAGE', {test: 'You\'ve Got This!'});
}

function Driver(){
  console.log('sending a messsage');

  // creating a payload to be emitted
  let payload = {test: 'You\'ve Got This!'};

  // emitting an event: takes 2 arguments: event name and payload
  eventEmitter.emit('SEND_MESSAGE', payload);
  // eventPool.emit('SEND_MESSAGE', {test: 'You\'ve Got This!'});
}

eventEmitter.on('SEND_MESSAGE', Vendor);
eventEmitter.on('SEND_MESSAGE', Driver);

Vendor();
setInterval(() => {
  Vendor();
}, 5000);
