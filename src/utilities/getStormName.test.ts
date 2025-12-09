import { Temporal } from 'temporal-polyfill';
import getStormName from './getStormName';

describe('get storm name', () => {
  test('should return Bram, when date is 9 December 2025', () => {
    const instant = Temporal.Instant.from('2025-12-09T00:00:00Z');

    expect(getStormName(instant)).toEqual('Bram');
  });

  test('should return Bram, when date is 8 December 2025', () => {
    const instant = Temporal.Instant.from('2025-12-08T00:00:00Z');

    expect(getStormName(instant)).toEqual('Bram');
  });

  test('should return null, when date is 7 December 2025', () => {
    const instant = Temporal.Instant.from('2025-12-07T00:00:00Z');

    expect(getStormName(instant)).toEqual(null);
  });

  test('should return null, when date is 12 December 2025', () => {
    const instant = Temporal.Instant.from('2025-12-12T00:00:00Z');

    expect(getStormName(instant)).toEqual(null);
  });
});
