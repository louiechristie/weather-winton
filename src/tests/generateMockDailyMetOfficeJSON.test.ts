import {
  isMetOfficeDailyForecastGeoJSON,
  MetOfficeDailyForecastGeoJSONSchema,
} from '../types/metOffice';
import generateMockDailyMetOfficeJSON from './generateMockDailyMetOfficeJSON';

describe('generate mock daily forecast', () => {
  test('mock daily json file valid', () => {
    const mockData = generateMockDailyMetOfficeJSON();
    const result = isMetOfficeDailyForecastGeoJSON(mockData);

    if (!result) {
      // Log validation errors for debugging
      const parseResult =
        MetOfficeDailyForecastGeoJSONSchema.safeParse(mockData);
      if (!parseResult.success) {
        console.error(
          'Zod validation errors:',
          JSON.stringify(parseResult.error.format(), null, 2)
        );
      }
    }

    expect(result).toEqual(true);
  });
});
