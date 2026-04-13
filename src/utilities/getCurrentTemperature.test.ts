import { expect, test } from '@jest/globals';

import { MetOfficeHourlyForecastGeoJSONSchema } from '../types/metOffice';

import getCurrentTemperature from './getCurrentTemperature';
import hourly from '../tests/hourly.json' with { type: 'json' };

test('getCurrentTemperature', () => {
  const hourlyForecast = MetOfficeHourlyForecastGeoJSONSchema.parse(hourly);
  expect(getCurrentTemperature(hourlyForecast, '2024-06-08T08:00Z')).toBe(
    13.49
  );
});
