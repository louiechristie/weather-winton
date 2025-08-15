import dayjs from 'dayjs';
import hourly from './hourly.json' with { type: 'json' };
import { MetOfficeHourlyForecastGeoJSON } from '../types/metOffice';

const hourlyObject: MetOfficeHourlyForecastGeoJSON =
  hourly as MetOfficeHourlyForecastGeoJSON;

const getMockMetOfficeJSON = (
  startTime: string = hourly.features[0].properties.timeSeries[0].time
): MetOfficeHourlyForecastGeoJSON => {
  const startTimeDayJS = dayjs(startTime).startOf('hour');

  let hour = -2;

  const getMockDate = () => {
    hour++;
    return startTimeDayJS.add(hour, 'hour').format('YYYY-MM-DDTHH:mm[Z]');
  };

  const ret: MetOfficeHourlyForecastGeoJSON = {
    ...hourlyObject,
    features: hourlyObject.features.map((feature) => ({
      ...feature,
      properties: {
        ...feature.properties,
        timeSeries: feature.properties.timeSeries.map((timeEntry) => ({
          ...timeEntry,
          time: getMockDate(),
        })),
      },
    })),
  };

  return ret;
};

export default getMockMetOfficeJSON;
