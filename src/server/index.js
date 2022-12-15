'use strict';

require('dotenv'.config());
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

const Queue = require('./lib/queue');
const server = new Server(PORT);
const pickupQueue = new Queue();
const deliveryQueue = new Queue();



// create a namespace
const caps = server.of('/caps');


caps.on('connection', (socket) => {
  socket.onAny((event, payload) => console.log({event, payload}));
  console.log('Socket connected to caps namespace', socket.id);


  //connect server to clients aka listen to clients
  // server.on('connection', (socket) => {
  //   console.log('Socket connected to Event Server!', socket.id);
  socket.on('JOIN', (queueId) => {
    console.log('These are the rooms', socket.rooms);
    socket.join(queueId);
    console.log('Joined the room: ', queueId);
    socket.emit('JOIN', queueId);
  });  

  socket.on('RECEIVED', (payload) => {
    let currentQueue = pickupQueue.read(payload.queueId);
    if(!currentQueue){
      let queueKey = pickupQueue.store(payload.queueId, new Queue());
      currentQueue = pickupQueue.read(queueKey);
    }
    currentQueue.store(payload.orderId, payload);
    
    socket.broadcast.emit('PICKUP', payload); 
  });

  socket.on('IN-TRANSIT', (payload) => {
    let currentQueue = pickupQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('Message receive, Queue not found');
    }
    let orderId = currentQueue.remove(payload.queueId);
    socket.to(payload.queueId).emit('RECEIVED', payload);
  });

  socket.on('DELIVERED', (payload) => {
    let currentQueue = deliveryQueue.read(payload.queueId);
    if(currentQueue && currentQueue.data){
      Object.keys(currentQueue.data).forEach(queueId => {
        socket.emit('DELIVERED', currentQueue.read(queueId));
        //this might be useful for lab 13
        // socket.to(messageId.queueId).emit('MESSAGE');
        socket.to(payload.queueId).emit('RECEIVED', payload);
      });
    }
  });

  socket.on('COMPLETED', (payload) => {
    let currentQueue = deliveryQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('Message receive, Queue not found');
    }
    let orderId = currentQueue.remove(payload.queueId);
  });
  
  socket.on('ORDER_PICKUP', (payload) => {
    let orderId = currentQueue.remove(payload.queueId);
    let currentQueue = pickupQueue.read(payload.queueId);
    if(currentQueue && currentQueue.data){
      Object.keys(currentQueue.data).forEach(queueId => {
        socket.emit('PICKUP', currentQueue.read(orderId));
      });
    }
  });

  socket.on('GET_ALL', (payload) => {
    let orderId = currentQueue.remove(payload.queueId);
    let currentQueue = pickupQueue.read(payload.queueId);
    if(currentQueue && currentQueue.data){
      Object.keys(currentQueue.data).forEach(queueId => {
        socket.emit('GET_ALL', currentQueue.read(orderId));
      });
    }
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



});
