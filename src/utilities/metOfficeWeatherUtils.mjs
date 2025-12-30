import { getIsHourInTheRemainingDay } from './getIsHourInTheRemainingDay.mjs';
import { weatherTypes } from '../types/metOffice';

export function getDescriptionFromMetOfficeWeatherCode(code) {
  return weatherTypes[code];
}

export function getEmojiFromMetOfficeWeatherCode(code) {
  const weatherImages = {
    NA: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/NA.svg',
    0: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/0.svg',
    1: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/1.svg',
    2: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/2.svg',
    3: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/3.svg',
    4: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/4.svg',
    5: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/5.svg',
    6: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/6.svg',
    7: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/7.svg',
    8: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/8.svg',
    9: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/9.svg',
    10: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/10.svg',
    11: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/11.svg',
    12: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/12.svg',
    13: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/13.svg',
    14: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/14.svg',
    15: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/15.svg',
    16: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/16.svg',
    17: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/17.svg',
    18: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/18.svg',
    19: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/19.svg',
    20: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/20.svg',
    21: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/21.svg',
    22: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/22.svg',
    23: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/23.svg',
    24: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/24.svg',
    25: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/25.svg',
    26: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/26.svg',
    27: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/27.svg',
    28: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/28.svg',
    29: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/29.svg',
    30: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/30.svg',
  };

  return weatherImages[code];
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
