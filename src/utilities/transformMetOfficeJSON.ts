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
import { getTemperatureFriendly } from './getRoomTemperatureComfortFromCelsius.mjs';
import getIsWindy from './getIsWindy';
import getIsTakeRainCoat from './getIsTakeRainCoat';

import {
  MetOfficeDailyForecastGeoJSON,
  MetOfficeHourlyForecastGeoJSON,
} from '../types/metOffice';
import SpecialDate from '@/types/specialDate';
import getStormName from './getStormName';
import { Temporal } from 'temporal-polyfill';

export type Item = {
  time: string; //  e.g. 2025-12-27T00:00Z - ISO 8601 format
  friendlyDate: string;
  friendlyTemperature: string;
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
  stormName: string | null;
  isWindy: boolean;
};

export type Items = Item[];

const isValidTime = (time: string) => {
  try {
    Temporal.Instant.from(time);
  } catch (e) {
    console.error(`Invalid time error for ${time}: `, e);
    return false;
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isItem(item: any): item is Item {
  return (
    item &&
    typeof item === 'object' &&
    'time' in item &&
    'friendlyDate' in item &&
    'description' in item &&
    'icon' in item &&
    'minTemperature' in item &&
    'maxTemperature' in item &&
    'relativeHumidity' in item &&
    'isSticky' in item &&
    'isDry' in item &&
    'isTakeRaincoat' in item &&
    'isSnowDay' in item &&
    'averageTemperature' in item &&
    'currentTemperature' in item &&
    'stormName' in item &&
    'isWindy' in item
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isItems(items: any): items is Items {
  return Array.isArray(items) && items.length > 0 && isItem(items[0]);
}

const transformMetOfficeJSON = async (
  specialDates: SpecialDate[],
  dailyJson: MetOfficeDailyForecastGeoJSON,
  hourlyJson?: MetOfficeHourlyForecastGeoJSON
): Promise<Item[]> => {
  const items: Items = dailyJson.features[0].properties.timeSeries.map(
    (day) => {
      const avgTemperature = avg(
        day.dayMaxScreenTemperature,
        day.dayLowerBoundMaxTemp
      );
      let currentTemperature = avgTemperature;

      if (hourlyJson) {
        currentTemperature = getCurrentTemperature(hourlyJson);
      }

      if (!isValidTime(day.time)) {
        throw new Error(`invalid date string: ${day.time}`);
      }

      return {
        time: day.time,
        friendlyDate: getFriendlyDateFromISODate(day.time, specialDates),
        description: getDescriptionFromMetOfficeWeatherCode(
          day.daySignificantWeatherCode.toString()
        ),
        icon: getEmojiFromMetOfficeWeatherCode(
          day.daySignificantWeatherCode.toString()
        ),
        friendlyTemperature: getTemperatureFriendly(avgTemperature),
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
        isTakeRaincoat: getIsTakeRainCoat(day),
        isSnowDay:
          day.dayProbabilityOfSnow >= 50 || day.nightProbabilityOfSnow >= 50,
        averageTemperature: avgTemperature,
        currentTemperature,
        stormName: getStormName(
          Temporal.Instant.from(day.time),
          getIsWindy(day.midday10MWindGust),
          getIsTakeRainCoat(day)
        ),
        isWindy: getIsWindy(day.midday10MWindGust),
      };
    }
  );

  const today = items[0];

  if (hourlyJson && isItem(today)) {
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
  }

  return items;
};

export default transformMetOfficeJSON;
