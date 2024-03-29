import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/London');

import log from './log.mjs';

dayjs.extend(isSameOrAfter);

function getDescriptionFromMetOfficeWeatherCode(code) {
  const weatherTypes = {
    NA: 'Not available',
    0: 'Clear night',
    1: 'Sunny day',
    2: 'Partly cloudy (night)',
    3: 'Partly cloudy',
    4: 'Not used',
    5: 'Mist',
    6: 'Fog',
    7: 'Cloudy',
    8: 'Overcast',
    9: 'Light rain shower (night)',
    10: 'Light rain shower',
    11: 'Drizzle',
    12: 'Light rain',
    13: 'Heavy rain shower (night)',
    14: 'Heavy rain shower',
    15: 'Heavy rain',
    16: 'Sleet shower (night)',
    17: 'Sleet shower',
    18: 'Sleet',
    19: 'Hail shower (night)',
    20: 'Hail shower',
    21: 'Hail',
    22: 'Light snow shower (night)',
    23: 'Light snow shower',
    24: 'Light snow',
    25: 'Heavy snow shower (night)',
    26: 'Heavy snow shower',
    27: 'Heavy snow',
    28: 'Thunder shower (night)',
    29: 'Thunder shower',
    30: 'Thunder',
  };

  return weatherTypes[code];
}

function getEmojiFromMetOfficeWeatherCode(code) {
  const weatherTypes = {
    NA: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/NA.svg?cachebust=1',
    0: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/0.svg?cachebust=1',
    1: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/1.svg?cachebust=1',
    2: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/2.svg?cachebust=1',
    3: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/3.svg?cachebust=1',
    4: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/4.svg?cachebust=1',
    5: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/5.svg?cachebust=1',
    6: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/6.svg?cachebust=1',
    7: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/7.svg?cachebust=1',
    8: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/8.svg?cachebust=1',
    9: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/9.svg?cachebust=1',
    10: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/10.svg?cachebust=1',
    11: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/11.svg?cachebust=1',
    12: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/12.svg?cachebust=1',
    13: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/13.svg?cachebust=1',
    14: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/14.svg?cachebust=1',
    15: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/15.svg?cachebust=1',
    16: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/16.svg?cachebust=1',
    17: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/17.svg?cachebust=1',
    18: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/18.svg?cachebust=1',
    19: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/19.svg?cachebust=1',
    20: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/20.svg?cachebust=1',
    21: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/21.svg?cachebust=1',
    22: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/22.svg?cachebust=1',
    23: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/23.svg?cachebust=1',
    24: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/24.svg?cachebust=1',
    25: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/25.svg?cachebust=1',
    26: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/26.svg?cachebust=1',
    27: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/27.svg?cachebust=1',
    28: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/28.svg?cachebust=1',
    29: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/29.svg?cachebust=1',
    30: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/30.svg?cachebust=1',
  };

  return weatherTypes[code];
}

/**
 *
 * @param Number max
 * @param Number min
 *
 * Calculate average daily temperature
 */
function avg(max, min) {
  return (max + min) / 2;
}

const getIsHourNeedsRaincoat = (hour) => {
  // For significantWeatherCode definitions see: https://www.metoffice.gov.uk/services/data/datapoint/code-definitions
  // For icons see: https://www.metoffice.gov.uk/weather/guides/what-does-this-forecast-mean
  const significantWeatherIsDrizzleOrWorse = hour.significantWeatherCode >= 11;
  return hour.probOfPrecipitation >= 50 || significantWeatherIsDrizzleOrWorse;
};

const getIsHourSnowy = (hour) => {
  return hour.totalSnowAmount > 0;
};

const getIsHourInTheRemainingDay = (hour) => {
  return (
    dayjs(hour.time).tz() >= dayjs().tz().startOf('hour').add(1, 'hour') &&
    dayjs(hour.time).tz() < dayjs().tz().endOf('day')
  );
};

export const getIsTakeRaincoatToday = (hourlyMetOfficeJSON) => {
  // console.log('hourlyMetOfficeJSON: ', hourlyMetOfficeJSON);

  const hourlyTimeSeries =
    hourlyMetOfficeJSON.features[0].properties.timeSeries;

  return hourlyTimeSeries.reduce((acc, nextHour) => {
    if (acc === true) return acc;

    if (
      getIsHourInTheRemainingDay(nextHour) &&
      getIsHourNeedsRaincoat(nextHour) &&
      getIsHourSnowy(nextHour) === false
    ) {
      return true;
    }

    return false;
  });
};

function getItemsFromMetOfficeJSON(dailyJson, hourlyJson) {
  log(`dailyJson: ${JSON.stringify(dailyJson, null, '  ')}`);
  log(`hourlyJson: ${JSON.stringify(hourlyJson, null, '  ')}`);

  const filter = (day) => {
    return dayjs(day.time).tz().isSameOrAfter(dayjs(), 'day');
  };

  const items = dailyJson.features[0].properties.timeSeries
    .filter(filter)
    .map((day) => {
      return {
        time: day.time,
        description: getDescriptionFromMetOfficeWeatherCode(
          day.daySignificantWeatherCode.toString()
        ),
        icon: getEmojiFromMetOfficeWeatherCode(
          day.daySignificantWeatherCode.toString()
        ),
        minTemperature: Math.min(
          day.dayMaxScreenTemperature,
          day.nightMinScreenTemperature
        ),
        maxTemperature: Math.max(
          day.dayMaxScreenTemperature,
          day.nightMinScreenTemperature
        ),
        avgTemperature: avg(
          day.dayMaxScreenTemperature,
          day.dayLowerBoundMaxTemp
        ),
        relativeHumidity: day.middayRelativeHumidity,
        isTakeRaincoat:
          day.dayProbabilityOfPrecipitation >= 50 ||
          day.nightProbabilityOfPrecipitation >= 50 ||
          day.daySignificantWeatherCode > 9 ||
          day.nightSignificantWeatherCode > 9,
        isSnowDay:
          day.dayProbabilityOfSnow >= 50 || day.nightProbabilityOfSnow >= 50,
      };
    });

  const thisHourFilter = (hour) => {
    return dayjs(hour.time).tz().isSame(dayjs().add(1, 'hour'), 'hour');
  };

  const hourlyTimeSeries = hourlyJson.features[0].properties.timeSeries;

  const temperatureOnNextHour =
    hourlyTimeSeries.filter(thisHourFilter)[0].screenTemperature;

  const isSnowDay = hourlyTimeSeries.reduce((acc, nextHour) => {
    if (acc === true) return acc;

    if (getIsHourInTheRemainingDay(nextHour) && getIsHourSnowy(nextHour)) {
      return true;
    }

    return false;
  });

  items[0].isTakeRaincoat = getIsTakeRaincoatToday(hourlyJson);
  items[0].isSnowDay = isSnowDay;

  items[0].indicativeTemperature = temperatureOnNextHour;

  items[0].maxTemperature = Math.max(
    ...hourlyTimeSeries
      .filter(getIsHourInTheRemainingDay)
      .map((hour) => hour.screenTemperature)
  );

  items[0].minTemperature = Math.min(
    ...hourlyTimeSeries
      .filter(getIsHourInTheRemainingDay)
      .map((hour) => hour.screenTemperature)
  );

  return items;
}

export default getItemsFromMetOfficeJSON;
