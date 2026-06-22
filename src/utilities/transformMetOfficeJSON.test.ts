import { Temporal } from 'temporal-polyfill';
import { test, expect, describe, beforeAll } from '@jest/globals';

import { Item } from './transformMetOfficeJSON';
import SpecialDate from '@/types/specialDate';
import getSpecialDates from './getSpecialDates';

import generateMockDailyMetOfficeJSON from '../tests/generateMockDailyMetOfficeJSON';

import hourly from '../tests/hourly.json' with { type: 'json' };
import minMaxTestDaily from '../../data/min-max-test/min-max-test-daily.json' with { type: 'json' };
import minMaxTestHourly from '../../data/min-max-test/min-max-test-hourly.json' with { type: 'json' };

import { onwardsFilterMetOfficeJSON } from './getForecast';
import transformMetOfficeJSON from './transformMetOfficeJSON';

import {
  MetOfficeDailyForecastGeoJSONRawSchema,
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

  test('temperature data is present and valid, transformMetOfficeJSON', async () => {
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

  describe('inside min and max temperature bounds', () => {
    let runDate: Temporal.Instant;
    let averageTemperature: number;
    let currentTemperature: number;
    let maxTemperature: number;
    let minTemperature: number;

    beforeAll(() => {
      runDate = Temporal.Instant.from('2026-05-31T15:00Z');

      const daily =
        MetOfficeDailyForecastGeoJSONRawSchema.parse(minMaxTestDaily);
      const dailyFiltered = onwardsFilterMetOfficeJSON(daily, runDate);
      const hourly =
        MetOfficeHourlyForecastGeoJSONSchema.parse(minMaxTestHourly);

      transformedData = transformMetOfficeJSON(
        specialDates,
        dailyFiltered,
        hourly,
        runDate
      );

      averageTemperature = transformedData[0].averageTemperature;
      currentTemperature = transformedData[0].currentTemperature;
      maxTemperature = transformedData[0].maxTemperature;
      minTemperature = transformedData[0].minTemperature;
    });

    test('current temperature is not greater than max temperature', async () => {
      expect(currentTemperature).not.toBeGreaterThan(maxTemperature);
    });

    test('average temperature is not greater than max temperature', async () => {
      expect(averageTemperature).not.toBeGreaterThan(maxTemperature);
    });

    test('current temperature is not less than min temperature', async () => {
      expect(currentTemperature).not.toBeLessThan(minTemperature);
    });

    test('average temperature is not less than min temperature', async () => {
      expect(averageTemperature).not.toBeLessThan(minTemperature);
    });
  });
});
