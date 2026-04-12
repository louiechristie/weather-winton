import { expect, test } from '@jest/globals';

import { getTemperatureFriendly } from './getRoomTemperatureComfortFromCelsius';

test(`getTemperatureFriendly: negative temperature`, () => {
  expect(getTemperatureFriendly(-4)).toBe('Freezing 🥶');
});

test(`getTemperatureFriendly: test 0`, () => {
  expect(getTemperatureFriendly(0)).toBe('Freezing 🥶');
});

test(`getTemperatureFriendly: max of freezing`, () => {
  expect(getTemperatureFriendly(4)).toBe('Freezing 🥶');
});

test(`getTemperatureFriendly: min limit of cold`, () => {
  expect(getTemperatureFriendly(4.1)).toBe('Cold');
});

test(`getTemperatureFriendly: max limit of cold`, () => {
  expect(getTemperatureFriendly(15.9)).toBe('Cold');
});

test(`getTemperatureFriendly: min limit of warm`, () => {
  expect(getTemperatureFriendly(16)).toBe('Warm');
});

test(`getTemperatureFriendly: max limit of warm`, () => {
  expect(getTemperatureFriendly(24)).toBe('Warm');
});

test(`getTemperatureFriendly: min limit of hot`, () => {
  expect(getTemperatureFriendly(24.1)).toBe('Hot 🥵');
});

test(`getTemperatureFriendly: very hot`, () => {
  expect(getTemperatureFriendly(50)).toBe('Hot 🥵');
});

test('getTemperatureFriendly Infinity celsius to throw error', () => {
  expect(() => {
    getTemperatureFriendly(Infinity);
  }).toThrow('Cannot get friendly temperature from Infinite celsius value');
});
