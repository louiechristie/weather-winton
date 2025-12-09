import { Temporal } from 'temporal-polyfill';
import getStormName from './getStormName';

describe('get storm name', () => {
  test('should return Bram, when date is 9 December', () => {
    const instant = Temporal.Instant.from('2025-12-09T00:00:00Z');

    expect(getStormName(instant)).toEqual('Bram');
  });

  test('should return Bram, when date is 8 December', () => {
    const instant = Temporal.Instant.from('2025-12-08T00:00:00Z');

    expect(getStormName(instant)).toEqual('Bram');
  });
});
