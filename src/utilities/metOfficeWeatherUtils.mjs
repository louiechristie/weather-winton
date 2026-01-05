import { getIsHourInTheRemainingDay } from './getIsHourInTheRemainingDay.mjs';
import { weatherTypes } from '../types/metOffice';

export function getDescriptionFromMetOfficeWeatherCode(code) {
  return weatherTypes[code];
}

export function getEmojiFromMetOfficeWeatherCode(code) {
  return `/images/${code}.svg`;
}

/**
 *
 * @param Number max
 * @param Number min
 *
 * Calculate average daily temperature
 */
export function avg(max, min) {
  return (max + min) / 2;
}

const getIsHourNeedsRaincoat = (hour) => {
  // For significantWeatherCode definitions see: https://www.metoffice.gov.uk/services/data/datapoint/code-definitions
  // For icons see: https://www.metoffice.gov.uk/weather/guides/what-does-this-forecast-mean
  const significantWeatherIsDrizzleOrWorse = hour.significantWeatherCode >= 11;
  return hour.probOfPrecipitation >= 50 || significantWeatherIsDrizzleOrWorse;
};

export const getIsHourSnowy = (hour) => {
  return hour.totalSnowAmount > 0;
};

export const getIsTakeRaincoatToday = (hourlyMetOfficeJSON) => {
  // log('hourlyMetOfficeJSON: ', hourlyMetOfficeJSON);

  const hourlyTimeSeries =
    hourlyMetOfficeJSON.features[0].properties.timeSeries;

  return hourlyTimeSeries.reduce((acc, nextHour) => {
    if (acc === true) return true;

    if (
      getIsHourInTheRemainingDay(nextHour.time) &&
      getIsHourNeedsRaincoat(nextHour) &&
      getIsHourSnowy(nextHour) === false
    ) {
      return true;
    }

    return false;
  });
};
