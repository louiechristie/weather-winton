import { Temporal } from 'temporal-polyfill';
import getStormName from './getStormName';

describe('get storm name', () => {
  test('should return null, when date is 7 December 2025', () => {
    const instant = Temporal.Instant.from('2025-12-07T00:00:00Z');

    expect(getStormName(instant, false, false)).toEqual(null);
  });

  test('should return Bram, when date is 8 December 2025 and weather is wet but not windy', () => {
    const instant = Temporal.Instant.from('2025-12-08T00:00:00Z');

    expect(getStormName(instant, false, true)).toEqual('Bram');
  });

  test('should return Bram, when date is 9 December 2025, and weather is windy and wet', () => {
    const instant = Temporal.Instant.from('2025-12-09T00:00:00Z');

    expect(getStormName(instant, true, true)).toEqual('Bram');
  });

  test('should return null, when date is 10 December 2025, and is not wet or windy ', () => {
    //www.theweathernetwork.com/en/news/weather/forecasts/wind-speed-cheat-sheet-how-to-gauge-wind-speed-damaging-gusts-hurricane-force
    const instant = Temporal.Instant.from('2025-12-07T00:00:00Z');

    expect(getStormName(instant, false, false)).toEqual(null);
  });

  test('should return null, when date is 12 December 2025, even if wet and windy', () => {
    const instant = Temporal.Instant.from('2025-12-12T00:00:00Z');

    expect(getStormName(instant, false, true)).toEqual(null);
  });
});
