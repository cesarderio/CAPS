
'use strict';

const { createOrder, thankTheDriver } = require('./handlers');
// const eventPool = require('../eventPool');
let socket = require('../socket-client');


jest.mock('../socket-client', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Acme-Widgets', () => {
  it('emits order as expect', () => {
    const payload = {
      store: '1-206-flowers',
      orderId: 'test123',
      customer: 'Raphael',
      address: 'home',
    };
    createOrder(socket)(payload);
    expect(console.log).toHaveBeenCalledWith('Vendor: order: test123 ready for pickup');
    expect(socket.emit).toHaveBeenCalledWith('PICKUP_READY', payload);
  });
  it('thanks the driver', () => {
    thankTheDriver({
      orderId: 'test123',
      customer: 'Raphael'});
    expect(console.log).toHaveBeenCalledWith('Vendor: Thank you for delivering order: test123 to: Raphael');
  });
});
