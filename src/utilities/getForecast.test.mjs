import getForecast, {
  getMockForecast,
  getSpecialDatesForecast,
} from './getForecast';
import getSpecialDates from './getSpecialDates';
import {
  MetOfficeHourlyForecastGeoJSONSchema,
  MetOfficeDailyForecastGeoJSONSchema,
  isMetOfficeHourlyForecastGeoJSON,
  isMetOfficeDailyForecastGeoJSON,
} from '../types/metOffice';
import generateMockDailyMetOfficeJSON from '../tests/generateMockDailyMetOfficeJSON';
import generateMockHourlyMetOfficeJSON from '../tests/generateMockHourlyMetOfficeJSON';
import dayjs from 'dayjs';

describe('getForecast module', () => {
  // ============================================================================
  // ENVIRONMENT VARIABLE TESTS
  // ============================================================================
  describe('Environment variables', () => {
    test('MET_WEATHER_SECRET is set and non-empty', () => {
      expect(process.env.MET_WEATHER_SECRET).toBeDefined();
      expect(process.env.MET_WEATHER_SECRET).not.toBe('');
      expect(typeof process.env.MET_WEATHER_SECRET).toBe('string');
    });

    test('MET_WEATHER_DAILY_URL is set and non-empty', () => {
      expect(process.env.MET_WEATHER_DAILY_URL).toBeDefined();
      expect(process.env.MET_WEATHER_DAILY_URL).not.toBe('');
      expect(typeof process.env.MET_WEATHER_DAILY_URL).toBe('string');
    });

    test('MET_WEATHER_HOURLY_URL is set and non-empty', () => {
      expect(process.env.MET_WEATHER_HOURLY_URL).toBeDefined();
      expect(process.env.MET_WEATHER_HOURLY_URL).not.toBe('');
      expect(typeof process.env.MET_WEATHER_HOURLY_URL).toBe('string');
    });

    test('all environment variables are properly configured', () => {
      const requiredVars = [
        'MET_WEATHER_SECRET',
        'MET_WEATHER_DAILY_URL',
        'MET_WEATHER_HOURLY_URL',
      ];

      requiredVars.forEach((varName) => {
        expect(process.env[varName]).toBeDefined();
        expect(process.env[varName]).not.toBe('');
      });
    });
  });

  // ============================================================================
  // ZOD SCHEMA VALIDATION TESTS
  // ============================================================================
  describe('Zod schema validation', () => {
    test('validates correct hourly forecast data', () => {
      const mockHourlyData = generateMockHourlyMetOfficeJSON();
      const result = MetOfficeHourlyForecastGeoJSONSchema.safeParse(mockHourlyData);

      expect(result.success).toBe(true);
    });

    test('validates correct daily forecast data', () => {
      const mockDailyData = generateMockDailyMetOfficeJSON();
      const result = MetOfficeDailyForecastGeoJSONSchema.safeParse(mockDailyData);

      expect(result.success).toBe(true);
    });

    test('type guards work with hourly data', () => {
      const mockHourlyData = generateMockHourlyMetOfficeJSON();
      expect(isMetOfficeHourlyForecastGeoJSON(mockHourlyData)).toBe(true);
    });

    test('type guards work with daily data', () => {
      const mockDailyData = generateMockDailyMetOfficeJSON();
      expect(isMetOfficeDailyForecastGeoJSON(mockDailyData)).toBe(true);
    });

    test('rejects invalid hourly data structure', () => {
      const invalidData = { type: 'Invalid', features: 'not-an-array' };
      expect(isMetOfficeHourlyForecastGeoJSON(invalidData)).toBe(false);
    });

    test('rejects invalid daily data structure', () => {
      const invalidData = { type: 'Invalid', features: 'not-an-array' };
      expect(isMetOfficeDailyForecastGeoJSON(invalidData)).toBe(false);
    });

    test('provides detailed error messages on validation failure', () => {
      const invalidData = { type: 'Wrong' };
      const result = MetOfficeHourlyForecastGeoJSONSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
        expect(result.error.issues[0]).toHaveProperty('message');
      }
    });

    test('handles optional fields in hourly data', () => {
      const mockData = generateMockHourlyMetOfficeJSON();
      // The mock data may have optional fields undefined
      const firstHour = mockData.features[0].properties.timeSeries[0];

      // These are optional in our schema
      expect(firstHour.maxScreenAirTemp === undefined || typeof firstHour.maxScreenAirTemp === 'number').toBe(true);
      expect(firstHour.minScreenAirTemp === undefined || typeof firstHour.minScreenAirTemp === 'number').toBe(true);
    });
  });

  // ============================================================================
  // getMockForecast TESTS
  // ============================================================================
  describe('getMockForecast', () => {
    test('returns an array of items', async () => {
      const specialDates = await getSpecialDates();
      const items = await getMockForecast(specialDates);

      expect(Array.isArray(items)).toBe(true);
      expect(items.length).toBeGreaterThan(0);
    });

    test('returns items with required properties', async () => {
      const specialDates = await getSpecialDates();
      const items = await getMockForecast(specialDates);
      const firstItem = items[0];

      expect(firstItem).toHaveProperty('description');
      expect(firstItem).toHaveProperty('icon');
      expect(firstItem).toHaveProperty('time');
      expect(typeof firstItem.description).toBe('string');
      expect(typeof firstItem.icon).toBe('string');
      expect(typeof firstItem.time).toBe('string');
    });

    test('filters dates to today onwards only', async () => {
      const specialDates = await getSpecialDates();
      const items = await getMockForecast(specialDates);
      const today = dayjs().startOf('day');

      items.forEach((item) => {
        const itemDate = dayjs(item.time);
        expect(itemDate.isSameOrAfter(today, 'day')).toBe(true);
      });
    });

    test('handles empty special dates array', async () => {
      const items = await getMockForecast([]);

      expect(Array.isArray(items)).toBe(true);
      expect(items.length).toBeGreaterThan(0);
    });

    test('returns consistent data structure', async () => {
      const specialDates = await getSpecialDates();
      const items = await getMockForecast(specialDates);

      items.forEach((item) => {
        expect(item).toHaveProperty('description');
        expect(item).toHaveProperty('icon');
        expect(item).toHaveProperty('time');
        expect(item).toHaveProperty('minTemperature');
        expect(item).toHaveProperty('maxTemperature');
      });
    });

    test('includes multiple days of forecast', async () => {
      const specialDates = await getSpecialDates();
      const items = await getMockForecast(specialDates);

      // Should have at least a few days of forecast
      expect(items.length).toBeGreaterThanOrEqual(3);
    });

    test('each item has a valid date string', async () => {
      const specialDates = await getSpecialDates();
      const items = await getMockForecast(specialDates);

      items.forEach((item) => {
        expect(dayjs(item.time).isValid()).toBe(true);
      });
    });
  });

  // ============================================================================
  // getSpecialDatesForecast TESTS
  // ============================================================================
  describe('getSpecialDatesForecast', () => {
    test('returns forecast items for special dates', async () => {
      const specialDates = await getSpecialDates();
      const items = await getSpecialDatesForecast(specialDates);

      expect(Array.isArray(items)).toBe(true);
      expect(items.length).toBeGreaterThan(0);
    });

    test('returns one item per special date', async () => {
      const specialDates = await getSpecialDates();
      const items = await getSpecialDatesForecast(specialDates);

      expect(items.length).toBe(specialDates.length);
    });

    test('items have valid structure', async () => {
      const specialDates = await getSpecialDates();
      const items = await getSpecialDatesForecast(specialDates);

      items.forEach((item) => {
        expect(item).toHaveProperty('description');
        expect(item).toHaveProperty('icon');
        expect(item).toHaveProperty('time');
        expect(typeof item.description).toBe('string');
        expect(item.description.length).toBeGreaterThan(0);
      });
    });

    test('handles empty special dates array', async () => {
      const items = await getSpecialDatesForecast([]);

      expect(Array.isArray(items)).toBe(true);
      expect(items.length).toBe(0);
    });

    test('number of items matches special dates count', async () => {
      const specialDates = await getSpecialDates();
      const items = await getSpecialDatesForecast(specialDates);

      // The key test is that we get one forecast per special date
      expect(items.length).toBe(specialDates.length);

      // Each item should have a valid date
      items.forEach((item) => {
        expect(dayjs(item.time).isValid()).toBe(true);
      });
    });
  });

  // ============================================================================
  // getForecast MAIN FUNCTION TESTS
  // ============================================================================
  describe('getForecast main function', () => {
    test('is exported as default', () => {
      expect(typeof getForecast).toBe('function');
    });

    test('returns a promise', () => {
      const specialDates = [];
      const result = getForecast(specialDates);
      expect(result).toBeInstanceOf(Promise);
    });

    test('accepts special dates parameter', () => {
      expect(getForecast.length).toBe(1);
    });
  });

  // ============================================================================
  // INTEGRATION TESTS
  // ============================================================================
  describe('Integration tests', () => {
    test('getMockForecast and getSpecialDatesForecast return compatible data structures', async () => {
      const specialDates = await getSpecialDates();
      const mockItems = await getMockForecast(specialDates);
      const specialItems = await getSpecialDatesForecast(specialDates);

      // Both should return arrays
      expect(Array.isArray(mockItems)).toBe(true);
      expect(Array.isArray(specialItems)).toBe(true);

      // Both should have items with the same structure
      if (mockItems.length > 0 && specialItems.length > 0) {
        const mockKeys = Object.keys(mockItems[0]).sort();
        const specialKeys = Object.keys(specialItems[0]).sort();
        expect(mockKeys).toEqual(specialKeys);
      }
    });

    test('all forecast functions handle special dates consistently', async () => {
      const specialDates = await getSpecialDates();

      const mockItems = await getMockForecast(specialDates);
      const specialItems = await getSpecialDatesForecast(specialDates);

      // Mock forecast should include multiple days
      expect(mockItems.length).toBeGreaterThan(1);

      // Special dates forecast should match special dates count
      expect(specialItems.length).toBe(specialDates.length);
    });

    test('date filtering works correctly across functions', async () => {
      const specialDates = await getSpecialDates();
      const mockItems = await getMockForecast(specialDates);
      const today = dayjs().startOf('day');

      // All mock items should be today or future
      mockItems.forEach((item) => {
        const itemDate = dayjs(item.time);
        expect(itemDate.isSameOrAfter(today, 'day')).toBe(true);
      });
    });

    test('all items have non-empty descriptions', async () => {
      const specialDates = await getSpecialDates();
      const mockItems = await getMockForecast(specialDates);
      const specialItems = await getSpecialDatesForecast(specialDates);

      [...mockItems, ...specialItems].forEach((item) => {
        expect(item.description).toBeDefined();
        expect(item.description.length).toBeGreaterThan(0);
      });
    });

    test('all items have valid weather icons', async () => {
      const specialDates = await getSpecialDates();
      const mockItems = await getMockForecast(specialDates);

      mockItems.forEach((item) => {
        expect(item.icon).toBeDefined();
        expect(typeof item.icon).toBe('string');
        expect(item.icon.length).toBeGreaterThan(0);
      });
    });

    test('temperature data is present and valid', async () => {
      const specialDates = await getSpecialDates();
      const mockItems = await getMockForecast(specialDates);

      mockItems.forEach((item) => {
        expect(item.minTemperature).toBeDefined();
        expect(item.maxTemperature).toBeDefined();
        expect(typeof item.minTemperature).toBe('number');
        expect(typeof item.maxTemperature).toBe('number');
      });
    });
  });
});
