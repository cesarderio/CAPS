'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('./lib/queue');
const server = new Server(PORT);
// const pickupQueue = new Queue();
// const deliveryQueue = new Queue();
const caps = server.of('/caps');
const messageQueue = new Queue();

caps.on('connection', (socket) => {
  socket.onAny((event, payload) => {
    const time = new Date();
    console.log('EVENT', {event, time, payload});
  });
  socket.on('JOIN', (id) => {
    console.log('These are the rooms', socket.rooms);
    socket.join(id);
    console.log('Joined the room: ', id);
    socket.emit('JOIN', id);
  });
  // console.log('Socket connected to caps namespace', socket.id);

  socket.on('PICKUP', (payload) => {
    // console.log('hub: vendor has delivery', payload)
    let currentQueue = messageQueue.read(payload.driverId);
    if(!currentQueue){
      let queueKey = messageQueue.store(payload.driverId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);
    socket.broadcast.emit('PICKUP', payload);
  });

  socket.on('IN-TRANSIT', (payload) => {
    socket.broadcast.emit('IN_TRANSIT', payload);
  });

  socket.on('DELIVERED', (payload) => {
    console.log('Driver: has delivered order');
    let currentQueue = messageQueue.read(payload.vendorId);
    if(!currentQueue){
      let queueKey = messageQueue.store(payload.vendorId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);
    socket.to(payload.vendorId).emit('DELIVERED', payload);
  });

  socket.on('RECEIVED', (payload) => {
    let currentQueue = messageQueue.read(payload.id);
    if(!currentQueue){
      throw new Error('no vendor queue present');
    }
    currentQueue.remove(payload.messageId);
  });

  socket.on('GET_ALL', (payload) => {
    let currentQueue = messageQueue.read(payload.id);
    if(currentQueue && currentQueue.data){
      Object.keys(currentQueue.data).forEach(message => {
        if(payload.id !== 'rPS'){
          socket.emit('DELIVERED', currentQueue.read(message));
        } else {
          socket.emit('PICKUP', currentQueue.read(message));
        }
      });
    }
  });

});





// socket.on('PICKUP', (payload) => {
//   console.log(`Driver: order: ${payload.orderId} picked up`);
//   socket.broadcast.emit('PICKUP', payload);
// });

// socket.on('IN_TRANSIT', (payload) => {
//   console.log(`Driver: order: ${payload.orderId} in transit`, payload);
// });

// socket.on('DELIVERED', (payload) => {
//   console.log('Driver: order delivered: ', payload.orderId);
//   socket.broadcast.emit('DELIVERED', payload);
// });


// socket.on('PICKUP', (payload) => {
//   // console.log('hub: vendor has delivery', payload)
//   let currentQueue = messageQueue.read(payload.driverId);
//   if(!currentQueue){
//     let queueKey = messageQueue.store(payload.driverId, new Queue());
//     currentQueue = messageQueue.read(queueKey);
//   }
//   currentQueue.store(payload.messageId, payload);
//   socket.broadcast.emit('PICKUP', payload);
// let orderId = currentQueue.remove(payload.queueId);
// let currentQueue = pickupQueue.read(payload.queueId);
// if(currentQueue && currentQueue.data){
//   Object.keys(currentQueue.data).forEach(queueId => {
//     socket.emit('PICKUP', currentQueue.read(orderId));
//   });
// }
// socket.on('IN-TRANSIT', (payload) => {
//   socket.broadcast.emit('IN_TRANSIT', payload)
// let currentQueue = pickupQueue.read(payload.queueId);
// if(!currentQueue){
//   throw new Error('Message receive, Queue not found');
// }
// let orderId = currentQueue.remove(payload.queueId);
// socket.to(payload.queueId).emit('RECEIVED', payload);
// });
// socket.on('DELIVERED', (payload) => {
//   console.log('Driver: has delivered order');
//   let currentQueue = deliveryQueue.read(payload.vendorId);
//   if(!currentQueue){
//     let queueKey = deliveryQueue.store(payload.vendorId, new Queue());
//     currentQueue = deliveryQueue.read(queueKey);
//   }
//   currentQueue.store(payload.messageId, payload);
//   socket.to(payload.vendorId).emit('DELIVERED', payload);
// if(currentQueue && currentQueue.data){
//   Object.keys(currentQueue.data).forEach(queueId => {
//     socket.emit('DELIVERED', currentQueue.read(queueId));
//     socket.to(payload.queueId).emit('RECEIVED', payload);
//   });
// }
// });
// socket.on('RECEIVED', (payload) => {
//   let currentQueue = messageQueue.read(payload.id);
//   if(!currentQueue){
//     throw new Error('no vendor queue created');
//   }
//   currentQueue.remove(payload.messageId);
// let currentQueue = pickupQueue.read(payload.queueId);
// if(!currentQueue){
//   let queueKey = pickupQueue.store(payload.queueId, new Queue());
//   currentQueue = pickupQueue.read(queueKey);
// }
// currentQueue.store(payload.orderId, payload);
// socket.broadcast.emit('PICKUP', payload);
// });
// socket.on('GET_ALL', (payload) => {
//   let currentQueue = messageQueue.read(payload.)

//   let orderId = currentQueue.remove(payload.queueId);
//   let currentQueue = pickupQueue.read(payload.queueId);
//   if(currentQueue && currentQueue.data){
//     Object.keys(currentQueue.data).forEach(queueId => {
//       socket.emit('GET_ALL', currentQueue.read(orderId));
//     });
//   }
// });
// socket.on('COMPLETED', (payload) => {
//   let currentQueue = messageQueue.read(payload.queueId);
//   if(!currentQueue){
//     throw new Error('Message receive, Queue not found');
//   }
//   let orderId = currentQueue.remove(payload.queueId);
// });







