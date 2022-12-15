'use strict';

const { io } = require('socket.io-client');
const socket = io('jttp://localhost:3001/caps');
// const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:3002/caps';

class Flowers() {
  constructor(queueId) {
    this.queueId = queueId;
    this.socket = socket;
    this.socket.emit('JOIN',queueId);
    this.socket.on('JOIN', (id) => {
      console.log('Joined Client Queue', id);
    });
  }
  
  publish(event, payload){
    this.socket.emit(event, {...payload, queueId: this.queueId});
  }
  
  subscribe(event, callback){
    this.socket.on(event, callback);
  }
}

module.exports = MessageClient;
