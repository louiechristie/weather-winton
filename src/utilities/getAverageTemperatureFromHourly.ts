import { getIsHourInTheRemainingDay } from './getIsHourInTheRemainingDay.mjs';

import {
  MetOfficeHourlyForecastGeoJSON,
  HourlyWeatherData,
} from '../types/metOffice';

const getAverageTemperaturefromHourly = (
  hourlyTimeSeries: MetOfficeHourlyForecastGeoJSON,
  fromTime?: string
) => {
  const average = (array: number[]) =>
    array.reduce((a, b) => a + b) / array.length;

  const hourlyTimeSeriesInRemainingDay: HourlyWeatherData[] =
    hourlyTimeSeries.features[0].properties.timeSeries.filter((hour) => {
      const hourIsInTheRemainingDay = getIsHourInTheRemainingDay(
        hour.time,
        fromTime
      );
      return hourIsInTheRemainingDay;
    });

  const temperatures = hourlyTimeSeriesInRemainingDay.map(
    (hour) => hour.screenTemperature
  );

  if (!temperatures || temperatures.length === 0) {
    throw Error('no temperatures in remaining day to average');
  }

  return average(temperatures);
};

export default getAverageTemperaturefromHourly;
