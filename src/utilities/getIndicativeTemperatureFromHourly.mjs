import { getIsHourInTheRemainingDay } from './getIsHourInTheRemainingDay.mjs';

/**
 *
 * @param {any} hourlyTimeSeries Met Office see https://datahub.metoffice.gov.uk/docs/f/category/site-specific/type/site-specific/api-documentation#get-/point/hourly
 * @param {number} fromTime ISO time from which to calculate the temperature forcast
 * @returns {number} temperature as float
 */
const getIndicativeTemperaturefromHourly = (hourlyTimeSeries, fromTime) => {
  const average = (array) => array.reduce((a, b) => a + b) / array.length;

  const hourlyTimeSeriesInRemainingDay =
    hourlyTimeSeries.features[0].properties.timeSeries.filter((hour) =>
      getIsHourInTheRemainingDay(hour.time, fromTime)
    );

  const temperatures = hourlyTimeSeriesInRemainingDay.map(
    (hour) => hour.screenTemperature
  );

  if (!temperatures || temperatures.length === 0)
    throw Error('no temperatures in remaining day to average');

  return average(temperatures);
};

export default getIndicativeTemperaturefromHourly;
