'use strict';

const eventEmitter = require('../hub');
const deliveredHandler = require('./deliveredHandler');

jest.mock('../hub.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Package delivered handle', () => {
  test('emit package delivered event to vendor', () => {
    deliveredHandler({delivered: 'yes'});
    expect(console.log).toHaveBeenCalledWith('HUB: Package has been delivered', {delivered: 'yes'});
    expect(eventEmitter.emit).toHaveBeenCalledWith('PACKAGE', 'close');
  });
  test('emit package delivered event to vendor', () => {
    deliveredHandler({delivered: 'no'});
    expect(console.log).toHaveBeenCalledWith('HUB: Package has been delivered', {delivered: 'no'});
    expect(eventEmitter.emit).toHaveBeenCalledWith('PACKAGE', 'open');
  });
});
