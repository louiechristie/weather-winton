import { getIsHourInTheRemainingDay } from './metOfficeWeatherUtils.mjs';

/**
 *
 * @param {any} hourlyTimeSeries Met Office see https://datahub.metoffice.gov.uk/docs/f/category/site-specific/type/site-specific/api-documentation#get-/point/hourly
 * @param {number} fromHour Integer from 0 to 23. The hour from which to calculate the temperature forcast
 * @returns {number} temperature as float
 */
const getIndicativeTemperatureFromHourly = (hourlyTimeSeries, fromHour) => {
  const average = (array) => array.reduce((a, b) => a + b) / array.length;

  const hourlyTimeSeriesInRemainingDay =
    hourlyTimeSeries.features[0].properties.timeSeries.filter((hour) =>
      getIsHourInTheRemainingDay(hour.time, fromHour)
    );

  const temperatures = hourlyTimeSeriesInRemainingDay.map(
    (hour) => hour.screenTemperature
  );

  return average(temperatures);
};

export default getIndicativeTemperatureFromHourly;
