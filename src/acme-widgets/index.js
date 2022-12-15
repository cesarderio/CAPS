'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');
const Chance = require('chance');
const chance = new Chance();

socket.emit('JOIN', 'acme-widgets');
socket.emit('GET_ALL', {queueId: 'acme-widgets'} );

