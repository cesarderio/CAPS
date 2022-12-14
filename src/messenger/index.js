'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001');

const Chance = require('chance');
const chance = new Chance();

socket.on('RECEIVED', )
