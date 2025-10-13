import {
  isMetOfficeHourlyForecastGeoJSON,
  MetOfficeHourlyForecastGeoJSONSchema,
} from '../types/metOffice';
import generateMockHourlyMetOfficeJSON from './generateMockHourlyMetOfficeJSON';
import hourly from './hourly.json' with { type: 'json' };

test('regenerate hourly.json file exactly', () => {
  expect(generateMockHourlyMetOfficeJSON()).toEqual(hourly);
});

test('mock hourly json file valid', () => {
  const mockData = generateMockHourlyMetOfficeJSON();
  const result = isMetOfficeHourlyForecastGeoJSON(mockData);

  if (!result) {
    // Log validation errors for debugging
    const parseResult = MetOfficeHourlyForecastGeoJSONSchema.safeParse(mockData);
    if (!parseResult.success) {
      console.error('Zod validation errors:', JSON.stringify(parseResult.error.format(), null, 2));
    }
  }

  expect(result).toEqual(true);
});
