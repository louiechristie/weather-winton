import { Temporal } from 'temporal-polyfill';
import {
  MetOfficeDailyForecastGeoJSON,
  MetOfficeDailyForecastGeoJSONSchema,
} from '../types/metOffice';
import testData from '../../data/test-data.json' with { type: 'json' };

const generateMockDailyMetOfficeJSON = (
  from: Temporal.Instant
): MetOfficeDailyForecastGeoJSON => {
  const todayZonedDateTime = from.toZonedDateTimeISO('Europe/London');
  const today = from.toString();
  const oneDayDuration = Temporal.Duration.from({ days: 1 });
  const tomorrow = todayZonedDateTime
    .add(oneDayDuration)
    .toInstant()
    .toString();
  const yesterday = todayZonedDateTime
    .subtract(oneDayDuration)
    .toInstant()
    .toString();

  const mockMetOfficeJSON = MetOfficeDailyForecastGeoJSONSchema.parse(testData);

  let timeSeries = mockMetOfficeJSON.features[0].properties.timeSeries;

  timeSeries = timeSeries.map((day, index) => {
    if (index === 0) {
      return {
        ...day,
        time: yesterday,
      };
    } else if (index === 1) {
      return {
        ...day,
        time: today,
      };
    } else if (index === 2) {
      return {
        ...day,
        time: tomorrow,
      };
    } else {
      return {
        ...day,
        time: todayZonedDateTime
          .add(Temporal.Duration.from({ days: index - 1 }))
          .toInstant()
          .toString(),
      };
    }
  });

  mockMetOfficeJSON.features[0].properties.timeSeries = timeSeries;

  return mockMetOfficeJSON;
};

export default generateMockDailyMetOfficeJSON;
