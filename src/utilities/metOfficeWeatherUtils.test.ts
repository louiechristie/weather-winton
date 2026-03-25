import { Temporal } from 'temporal-polyfill';
import { getIsTakeRaincoatToday } from './metOfficeWeatherUtils';
import mockHourlyNoRaincoatJSON from '../tests/mockHourlyNoRaincoat.mjs';
import mockHourlyNeedRaincoatJSON from '../tests/mockHourlyNeedRaincoat.mjs';
import mockHourlyRainAtMidnightJSON from '../tests/mockHourlyRainAtMidnight.mjs';
import mockHourlyRainAtElevenJSON from '../tests/mockHourlyRainAtEleven.mjs';
import { MetOfficeHourlyForecastGeoJSONSchema } from '../types/metOffice';

const mockHourlyNoRaincoat = MetOfficeHourlyForecastGeoJSONSchema.parse(
  mockHourlyNoRaincoatJSON()
);

const mockHourlyNeedRaincoat = MetOfficeHourlyForecastGeoJSONSchema.parse(
  mockHourlyNeedRaincoatJSON()
);

const mockHourlyRainAtMidnight = MetOfficeHourlyForecastGeoJSONSchema.parse(
  mockHourlyRainAtMidnightJSON()
);

const mockHourlyRainAtEleven = MetOfficeHourlyForecastGeoJSONSchema.parse(
  mockHourlyRainAtElevenJSON()
);

test('isTakeRaincoatToday false', () => {
  expect(
    getIsTakeRaincoatToday(
      mockHourlyNoRaincoat,
      Temporal.Instant.from('2023-07-12T00:00Z')
    )
  ).toBe(false);
});

test('isTakeRaincoatToday true when there is rain one hour between now and the end of the day', () => {
  expect(
    getIsTakeRaincoatToday(
      mockHourlyNeedRaincoat,
      Temporal.Instant.from('2023-07-10T22:00Z')
    )
  ).toBe(true);
});

test('isTakeRaincoatToday false when there is rain only at midnight', () => {
  expect(
    getIsTakeRaincoatToday(
      mockHourlyRainAtMidnight,
      Temporal.Instant.from('2023-07-12T00:00Z')
    )
  ).toBe(false);
});

test('isTakeRaincoatToday true when there is rain only at 23:00', () => {
  expect(
    getIsTakeRaincoatToday(mockHourlyRainAtEleven, Temporal.Now.instant())
  ).toBe(true);
});
