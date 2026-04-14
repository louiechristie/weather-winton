import { Temporal } from 'temporal-polyfill';
import { test, expect, describe, beforeAll } from '@jest/globals';

import { Item } from './transformMetOfficeJSON';
import SpecialDate from '@/types/specialDate';

import getSpecialDates from './getSpecialDates';

import generateMockDailyMetOfficeJSON from '../tests/generateMockDailyMetOfficeJSON';

import hourly from '../tests/hourly.json' with { type: 'json' };
import transformMetOfficeJSON from './transformMetOfficeJSON';

import {
  MetOfficeHourlyForecastGeoJSONSchema,
  MetOfficeDailyForecastGeoJSON,
  MetOfficeHourlyForecastGeoJSON,
} from '../types/metOffice';

describe('transformMetOfficeJSON', () => {
  let specialDates: SpecialDate[] = [];
  let transformedData: Item[];
  let dailyData: MetOfficeDailyForecastGeoJSON;
  let hourlyData: MetOfficeHourlyForecastGeoJSON;
  const now = Temporal.Instant.from('2024-06-08T07:00Z');

  beforeAll(async () => {
    specialDates = await getSpecialDates();
    dailyData = generateMockDailyMetOfficeJSON(now);
    hourlyData = MetOfficeHourlyForecastGeoJSONSchema.parse(hourly);

    transformedData = transformMetOfficeJSON(
      specialDates,
      dailyData,
      hourlyData,
      now
    );
  });

  test('transformed data has correct length', () => {
    expect(transformedData.length).toBe(
      dailyData.features[0].properties.timeSeries.length
    );
  });

  test('temperature data is present and valid', async () => {
    transformedData.forEach((item) => {
      const minIsFinite = Number.isFinite(item.minTemperature);
      const maxIsFinite = Number.isFinite(item.maxTemperature);

      expect(minIsFinite).toBe(true);
      expect(maxIsFinite).toBe(true);
    });
  });

  test('temperature data is present and valid between 11pm and midnight', async () => {
    const transformedData = transformMetOfficeJSON(
      specialDates,
      dailyData,
      hourlyData,
      Temporal.Instant.from('2024-06-08T23:30Z')
    );

    transformedData.forEach((item) => {
      const minIsFinite = Number.isFinite(item.minTemperature);
      const maxIsFinite = Number.isFinite(item.maxTemperature);
      expect(minIsFinite).toBe(true);
      expect(maxIsFinite).toBe(true);
    });
  });
});
