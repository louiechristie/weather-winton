import dayjs from 'dayjs';
import getCurrentTemperature from './getCurrentTemperature.mjs';
import {
  getDescriptionFromMetOfficeWeatherCode,
  getEmojiFromMetOfficeWeatherCode,
  avg,
  getIsHourSnowy,
  getIsTakeRaincoatToday,
} from './metOfficeWeatherUtils.mjs';
import { getIsTooDryFromRelativeHumidity } from '../utilities/getComfortFromRelativeHumidity.mjs';
import getIsStickyFromCelsiusAndRelativeHumidity from '../utilities/getIsStickyFromCelsiusAndRelativeHumidity.mjs';
import { getIsHourInTheRemainingDay } from './getIsHourInTheRemainingDay.mjs';
import getAverageTemperaturefromHourly from './getAverageTemperatureFromHourly';
import getFriendlyDateFromISODate from './getFriendlyDateFromISODate';

import {
  MetOfficeDailyForecastGeoJSON,
  MetOfficeHourlyForecastGeoJSON,
  isMetOfficeDailyForecastGeoJSON,
  isMetOfficeHourlyForecastGeoJSON,
} from '../types/metOffice';
import SpecialDate from '@/types/specialDate';

export type item = {
  time: string;
  friendlyDate: string;
  description: string;
  icon: string;
  minTemperature: number;
  maxTemperature: number;
  relativeHumidity: number;
  isSticky: boolean;
  isDry: boolean;
  isTakeRaincoat: boolean;
  isSnowDay: boolean;
  averageTemperature: number;
  currentTemperature: number;
};

export type items = item[];

const transformMetOfficeJSON = async (
  dailyJson: MetOfficeDailyForecastGeoJSON,
  hourlyJson: MetOfficeHourlyForecastGeoJSON,
  specialDates: SpecialDate[]
): Promise<item[]> => {
  // log(`dailyJson: ${JSON.stringify(dailyJson, null, '  ')}`);
  // log(`hourlyJson: ${JSON.stringify(hourlyJson, null, '  ')}`);

  if (!isMetOfficeDailyForecastGeoJSON(dailyJson)) {
    throw new Error('Invalid Met Office Daily Forecast GeoJSON');
  }

  if (!isMetOfficeHourlyForecastGeoJSON(hourlyJson)) {
    throw new Error('Invalid Met Office Hourly Forecast GeoJSON');
  }

  const items = dailyJson.features[0].properties.timeSeries
    .filter((day) => day.daySignificantWeatherCode !== undefined)
    .map((day) => {
      const avgTemperature = avg(
        day.dayMaxScreenTemperature,
        day.dayLowerBoundMaxTemp
      );
      const currentTemperature = getCurrentTemperature(hourlyJson);
      return {
        time: day.time,
        friendlyDate: getFriendlyDateFromISODate(day.time, specialDates),
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
        isSticky: getIsStickyFromCelsiusAndRelativeHumidity(
          avgTemperature,
          day.middayRelativeHumidity
        ),
        isDry: getIsTooDryFromRelativeHumidity(day.middayRelativeHumidity),
        isTakeRaincoat:
          day.dayProbabilityOfPrecipitation >= 50 ||
          day.nightProbabilityOfPrecipitation >= 50 ||
          day.daySignificantWeatherCode > 9 ||
          day.nightSignificantWeatherCode > 9,
        isSnowDay:
          day.dayProbabilityOfSnow >= 50 || day.nightProbabilityOfSnow >= 50,
        averageTemperature: avgTemperature,
        currentTemperature,
      };
    });

  const hourlyTimeSeries = hourlyJson.features[0].properties.timeSeries;

  const isSnowDay =
    hourlyTimeSeries.filter((nextHour) => {
      if (
        getIsHourInTheRemainingDay(nextHour.time) &&
        getIsHourSnowy(nextHour)
      ) {
        return true;
      }

      return false;
    }).length > 0;

  items[0].isTakeRaincoat = getIsTakeRaincoatToday(hourlyJson);
  items[0].isSnowDay = isSnowDay;

  items[0].averageTemperature = getAverageTemperaturefromHourly(hourlyJson);
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
