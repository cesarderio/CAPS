'use strict';

const eventPool = require('../eventPool');


const { orderInTransit, deliveryHandler } = require('./driverHandler');



jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Driver', () => {
  it('picks up order and emits in transit as expected', () => {
    const payload = {
      store: '1-206-flowers',
      orderId: 'test123',
      customer: 'Raphael',
      address: 'home',
    };
    orderInTransit(payload);
    expect(console.log).toHaveBeenCalledWith('Driver: order: test123 picked up');
    expect(eventPool.emit).toHaveBeenCalledWith('IN_TRANSIT', payload);
  });
  it('delivers as expected', () => {
    const payload = {
      store: '1-206-flowers',
      orderId: 'test123',
      customer: 'Raphael',
      address: 'home',
    };
    deliveryHandler(payload);
    expect(console.log).toHaveBeenCalledWith(`Driver: test123 delivered`);
    expect(eventPool.emit).toHaveBeenCalledWith('DELIVERED', payload);
  });
});
