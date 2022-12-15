'use strict';

let socket = require('../socket-client');
const { createOrder, thankTheDriver } = require('./vendorHandler');
// const eventPool = require('../eventPool');
// const eventPool = require('../eventPool');

jest.mock('../socket-client', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Vendor', () => {
  it('emits order as expect', () => {
    const payload = {
      store: '1-206-flowers',
      orderId: 'test123',
      customer: 'Raphael',
      address: 'home',
    };
    createOrder(payload);
    expect(console.log).toHaveBeenCalledWith(`Vendor: order: test123 ready for pickup`);
    expect(socket.emit).toHaveBeenCalledWith('PICKUP_READY', payload);
  });
  it('thanks the driver', () => {
    thankTheDriver({
      orderId: 'test123',
      customer: 'Raphael'});
    expect(console.log).toHaveBeenCalledWith('Vendor: Thank you for delivering order: test123 to: Raphael');
  });
});
