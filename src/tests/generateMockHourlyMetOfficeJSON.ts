import hourly from './hourly.json' with { type: 'json' };
import { MetOfficeHourlyForecastGeoJSON } from '../types/metOffice';

import getMockDate from './getMockDate';

const hourlyObject: MetOfficeHourlyForecastGeoJSON =
  hourly as MetOfficeHourlyForecastGeoJSON;

const getMockMetOfficeJSON = (
  startTime: string = hourly.features[0].properties.timeSeries[0].time
): MetOfficeHourlyForecastGeoJSON => {
  const ret: MetOfficeHourlyForecastGeoJSON = {
    ...hourlyObject,
    features: hourlyObject.features.map((feature) => ({
      ...feature,
      properties: {
        ...feature.properties,
        timeSeries: feature.properties.timeSeries.map((timeEntry, index) => ({
          ...timeEntry,
          time: index === 0 ? getMockDate(startTime) : getMockDate(),
        })),
      },
    })),
  };

  return ret;
};

export default getMockMetOfficeJSON;
