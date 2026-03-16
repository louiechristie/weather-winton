import { Temporal } from 'temporal-polyfill';
import { getIsHourInTheRemainingDay } from './getIsHourInTheRemainingDay';
import {
  weatherTypes,
  HourlyWeatherData,
  MetOfficeHourlyForecastGeoJSONSchema,
  MetOfficeHourlyForecastGeoJSON,
} from '../types/metOffice';

export function getDescriptionFromMetOfficeWeatherCode(code: number) {
  return weatherTypes[code];
}

export function getEmojiFromMetOfficeWeatherCode(code: number) {
  return `/images/${code}.svg`;
}

/**
 *
 * @param Number max
 * @param Number min
 *
 * Calculate average daily temperature
 */
export function avg(max: number, min: number) {
  return (max + min) / 2;
}

const getIsHourNeedsRaincoat = (hour: HourlyWeatherData) => {
  // For significantWeatherCode definitions see: https://www.metoffice.gov.uk/services/data/datapoint/code-definitions
  // For icons see: https://www.metoffice.gov.uk/weather/guides/what-does-this-forecast-mean
  const significantWeatherIsDrizzleOrWorse = hour.significantWeatherCode >= 11;
  return hour.probOfPrecipitation >= 50 || significantWeatherIsDrizzleOrWorse;
};

export const getIsHourSnowy = (hour: HourlyWeatherData) => {
  return hour.totalSnowAmount && hour.totalSnowAmount > 0;
};

export const getIsTakeRaincoatToday = (
  hourlyMetOfficeJSON: MetOfficeHourlyForecastGeoJSON,
  currentTime: Temporal.Instant
) => {
  // log('hourlyMetOfficeJSON: ', hourlyMetOfficeJSON);

  const hourlyMetOffice =
    MetOfficeHourlyForecastGeoJSONSchema.parse(hourlyMetOfficeJSON);

  const hourlyTimeSeries = hourlyMetOffice.features[0].properties.timeSeries;

  hourlyTimeSeries.forEach((nextHour) => {
    const nextHourTime = Temporal.Instant.from(nextHour.time);

    if (
      getIsHourInTheRemainingDay(nextHourTime, currentTime) &&
      getIsHourNeedsRaincoat(nextHour) &&
      getIsHourSnowy(nextHour) === false
    ) {
      return true;
    }
  });

  return false;
};
