'use strict';

require('dotenv'.config());
const { Server } = require('socket.io');
// const socket = require('../socket-client');
const PORT = process.env.PORT || 3002;
// const Queue = require('./lib/queue');

const server = new Server(PORT);
// const messages = server.of('./messages');
// const messageQueue = new Queue();

// create a namespace
const caps = server.of('/caps');


caps.on('connection', (socket) => {
  socket.onAny((event, payload) => console.log({event, payload}));
  console.log('Socket connected to caps namespace', socket.id);
  socket.on('PICKUP', (payload) => {
    console.log(`Driver: order: ${payload.orderId} picked up`);
    socket.broadcast.emit('PICKUP', payload);
  });

  socket.on('IN_TRANSIT', (payload) => {
    console.log(`Driver: order: ${payload.orderId} in transit`, payload);
  });

  socket.on('DELIVERED', (payload) => {
    console.log('Driver: order delivered: ', payload.orderId);
    socket.broadcast.emit('DELIVERED', payload);
  });

  //   //connect server to clients aka listen to clients
  //   // server.on('connection', (socket) => {
  //   //   console.log('Socket connected to Event Server!', socket.id);
  //   socket.on('JOIN', (queueId) => {
  //     console.log('These are the rooms', socket.queueId);
  //     socket.join(queueId);
  //     console.log('Joined the room: ', queueId);
  //     socket.emit('JOIN', queueId);
  //   });  

  //   socket.on('IN_TRANSIT', (payload) => {
  //     console.log('Server MESSAGE event', payload);

  //     let currentQueue = messageQueue.read(payload.queueId);
  //     if(!currentQueue){
  //       let queueKey = messageQueue.store(payload.queueId, new Queue());
  //       currentQueue = messageQueue.read(queueKey);
  //     }
  //     currentQueue.store(payload.messageId, payload);
    
  //     socket.broadcast.emit('MESSAGE', payload); 
  //   });

  //   socket.on('RECEIVED', (payload) => {
  //     console.log('Server RECEIVED event', payload );

  //     let currentQueue = messageQueue.read(payload.queueId);
  //     if(!currentQueue){
  //       throw new Error('We have messages but no Queue!');
  //     }
  //     let message = currentQueue.remove(payload.messageId);
  //     socket.to(payload.queueId).emit('RECEIVED', message);
  //   });

  //   socket.on('GET_MESSAGES', (payload) => {
  //     console.log('messages were grabbed');
  //     let currentQueue = messageQueue.read(payload.queueId);
  //     if(currentQueue && currentQueue.data){
  //       Object.keys(currentQueue.data).forEach(messageId => {
  //         socket.emit('MESSAGE', currentQueue.read(messageId));
  //         //this might be useful for lab 13
  //         // socket.to(messageId.queueId).emit('MESSAGE');
  //         // socket.to(messageId.queueId).emit('RECEIVED');
  //       });
  //     }
  //   });



});
