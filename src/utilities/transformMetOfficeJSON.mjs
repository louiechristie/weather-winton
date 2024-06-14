import dayjs from 'dayjs';
import log from './log.mjs';
import getCurrentTemperature from './getCurrentTemperature.mjs';
import {
  getDescriptionFromMetOfficeWeatherCode,
  getEmojiFromMetOfficeWeatherCode,
  avg,
  getIsHourSnowy,
  getIsTakeRaincoatToday,
} from './metOfficeWeatherUtils.mjs';
import { getIsHourInTheRemainingDay } from './getIsHourInTheRemainingDay.mjs';
import getIndicativeTemperaturefromHourly from './getIndicativeTemperatureFromHourly.mjs';

const transformMetOfficeJSON = (dailyJson, hourlyJson) => {
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
        relativeHumidity: day.middayRelativeHumidity,
        isTakeRaincoat:
          day.dayProbabilityOfPrecipitation >= 50 ||
          day.nightProbabilityOfPrecipitation >= 50 ||
          day.daySignificantWeatherCode > 9 ||
          day.nightSignificantWeatherCode > 9,
        isSnowDay:
          day.dayProbabilityOfSnow >= 50 || day.nightProbabilityOfSnow >= 50,
        indicativeTemperature: avg(
          day.dayMaxScreenTemperature,
          day.dayLowerBoundMaxTemp
        ),
        currentTemperature: null,
      };
    });

  const hourlyTimeSeries = hourlyJson.features[0].properties.timeSeries;

  const isSnowDay = hourlyTimeSeries.reduce((acc, nextHour) => {
    if (acc === true) return acc;

    if (getIsHourInTheRemainingDay(nextHour.time) && getIsHourSnowy(nextHour)) {
      return true;
    }

    return false;
  });

  items[0].isTakeRaincoat = getIsTakeRaincoatToday(hourlyJson);
  items[0].isSnowDay = isSnowDay;

  items[0].indicativeTemperature =
    getIndicativeTemperaturefromHourly(hourlyJson);
  items[0].currentTemperature = getCurrentTemperature(hourlyJson);

  items[0].maxTemperature = Math.max(
    ...hourlyTimeSeries
      .filter((hour) =>
        getIsHourInTheRemainingDay(hour.time, dayjs().toISOString())
      )
      .map((hour) => hour.screenTemperature)
  );

  items[0].minTemperature = Math.min(
    ...hourlyTimeSeries
      .filter((hour) =>
        getIsHourInTheRemainingDay(hour.time, dayjs().toISOString())
      )
      .map((hour) => hour.screenTemperature)
  );

  return items;
};

export default transformMetOfficeJSON;
