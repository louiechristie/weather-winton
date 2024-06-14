import dayjs from 'dayjs';

/**
 *
 * @param {object} hourlyJson in Met office format for hourly spot data
 * @param {string} [currentTime] optional in date ISO string
 * @returns
 */
const getCurrentTemperature = (hourlyJson, currentTime) => {
  return hourlyJson.features[0].properties.timeSeries
    .filter((hour) =>
      dayjs(hour.time).isSame(dayjs(currentTime).startOf('hour'))
    )
    .map((hour) => hour.screenTemperature)[0];
};

export default getCurrentTemperature;
