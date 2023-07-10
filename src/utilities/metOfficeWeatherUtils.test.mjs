import { getIsTakeRaincoatToday } from './metOfficeWeatherUtils.mjs';
import mockHourlyNoRaincoatJSON from '../tests/mockHourlyNoRaincoat.mjs';
import mockHourlyNeedRaincoatJSON from '../tests/mockHourlyNeedRaincoat.mjs';
import getMockMetOfficeJSON from '../tests/mockDailyMetOfficeJSON.mjs';
import mockHourlyRainAtMidnightJSON from '../tests/mockHourlyRainAtMidnight.mjs';
import mockHourlyRainAtElevenJSON from '../tests/mockHourlyRainAtEleven.mjs';
import { jest } from '@jest/globals';

jest.useFakeTimers();

test('isTakeRaincoatToday false', () => {
  expect(getIsTakeRaincoatToday(mockHourlyNoRaincoatJSON())).toBe(false);
});

test('isTakeRaincoatToday true when there is a 50% chance of rain one hour between now and the end of the day', () => {
  expect(getIsTakeRaincoatToday(mockHourlyNeedRaincoatJSON())).toBe(true);
});

test('isTakeRaincoatToday false when there is a 50% chance of rain only at midnight', () => {
  expect(getIsTakeRaincoatToday(mockHourlyRainAtMidnightJSON())).toBe(false);
});

test('isTakeRaincoatToday true when there is a 50% chance of rain only at 23:00', () => {
  expect(getIsTakeRaincoatToday(mockHourlyRainAtElevenJSON())).toBe(true);
});
