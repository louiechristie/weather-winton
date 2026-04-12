import { Temporal } from 'temporal-polyfill';
import getCurrentTemperature from './getCurrentTemperature';
import {
  getDescriptionFromMetOfficeWeatherCode,
  getEmojiFromMetOfficeWeatherCode,
  avg,
  getIsHourSnowy,
  getIsTakeRaincoatToday,
} from './metOfficeWeatherUtils';
import { getIsTooDryFromRelativeHumidity } from './getComfortFromRelativeHumidity';
import getIsStickyFromCelsiusAndRelativeHumidity from '../utilities/getIsStickyFromCelsiusAndRelativeHumidity.mjs';
import { getIsHourInTheRemainingDay } from './getIsHourInTheRemainingDay';
import getAverageTemperaturefromHourly from './getAverageTemperatureFromHourly';
import getFriendlyDateFromISODate from './getFriendlyDateFromISODate';
import { getTemperatureFriendly } from './getRoomTemperatureComfortFromCelsius.mjs';
import getIsWindy from './getIsWindy';
import getIsTakeRaincoat from './getIsTakeRaincoat';

import {
  MetOfficeDailyForecastGeoJSON,
  MetOfficeHourlyForecastGeoJSON,
} from '../types/metOffice';
import SpecialDate from '@/types/specialDate';
import getStormName from './getStormName';
import { getIsLooney } from './moon/getIsLooney';

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
  isLooney: boolean;
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
    'isWindy' in item &&
    'isLooney' in item
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isItems(items: any): items is Items {
  return Array.isArray(items) && items.length > 0 && isItem(items[0]);
}

const transformMetOfficeJSON = (
  specialDates: SpecialDate[],
  dailyJson: MetOfficeDailyForecastGeoJSON,
  hourlyJson: MetOfficeHourlyForecastGeoJSON,
  now: Temporal.Instant
): Item[] => {
  const items: Items = dailyJson.features[0].properties.timeSeries.map(
    (day) => {
      const averageTemperature = avg(
        day.dayMaxScreenTemperature,
        day.dayLowerBoundMaxTemp
      );
      let currentTemperature = averageTemperature;

      if (hourlyJson) {
        currentTemperature = getCurrentTemperature(hourlyJson);
      }

      if (!isValidTime(day.time)) {
        throw new Error(`invalid date string: ${day.time}`);
      }

      const time = day.time;
      const friendlyDate = getFriendlyDateFromISODate(day.time, specialDates);
      const description = getDescriptionFromMetOfficeWeatherCode(
        day.daySignificantWeatherCode
      );
      const icon = getEmojiFromMetOfficeWeatherCode(
        day.daySignificantWeatherCode
      );
      const friendlyTemperature = getTemperatureFriendly(averageTemperature);
      const minTemperature = Math.min(
        day.dayMaxScreenTemperature,
        day.nightMinScreenTemperature
      );
      const maxTemperature = Math.max(
        day.dayMaxScreenTemperature,
        day.nightMinScreenTemperature
      );
      const relativeHumidity = day.middayRelativeHumidity;
      const isSticky = getIsStickyFromCelsiusAndRelativeHumidity(
        averageTemperature,
        day.middayRelativeHumidity
      );
      const isDry = getIsTooDryFromRelativeHumidity(day.middayRelativeHumidity);
      const isWindy = getIsWindy(day.midday10MWindGust);
      const isTakeRaincoat = getIsTakeRaincoat(day);
      const isSnowDay =
        day.dayProbabilityOfSnow >= 50 || day.nightProbabilityOfSnow >= 50;
      const stormName = getStormName(
        Temporal.Instant.from(day.time),
        isWindy,
        isTakeRaincoat
      );
      const toZonedDateTimeISO = Temporal.Instant.from(
        day.time
      ).toZonedDateTimeISO('UTC');
      const isLooney = getIsLooney(toZonedDateTimeISO);

      return {
        time,
        friendlyDate,
        description,
        icon,
        friendlyTemperature,
        minTemperature,
        maxTemperature,
        relativeHumidity,
        isSticky,
        isDry,
        isTakeRaincoat,
        isSnowDay,
        averageTemperature,
        currentTemperature,
        stormName,
        isWindy,
        isLooney,
      };
    }
  );

  const today = items[0];

  if (hourlyJson && isItem(today)) {
    const hourlyTimeSeries = hourlyJson.features[0].properties.timeSeries;

    const isSnowDay =
      hourlyTimeSeries.filter((nextHour) => {
        const instant = Temporal.Instant.from(nextHour.time);
        if (
          getIsHourInTheRemainingDay(instant, now) &&
          getIsHourSnowy(nextHour)
        ) {
          return true;
        }

        return false;
      }).length > 0;

    items[0].isTakeRaincoat = getIsTakeRaincoatToday(hourlyJson, now);
    items[0].isSnowDay = isSnowDay;

    items[0].averageTemperature =
      getAverageTemperaturefromHourly(hourlyJson, Temporal.Now.instant()) ||
      getCurrentTemperature(hourlyJson);
    items[0].currentTemperature = getCurrentTemperature(hourlyJson);

    items[0].maxTemperature = Math.max(
      ...hourlyTimeSeries
        .filter((hour) =>
          getIsHourInTheRemainingDay(
            Temporal.Instant.from(hour.time),
            Temporal.Now.instant()
          )
        )
        .map((hour) => hour.screenTemperature)
    );

    items[0].minTemperature = Math.min(
      ...hourlyTimeSeries
        .filter((hour) =>
          getIsHourInTheRemainingDay(
            Temporal.Instant.from(hour.time),
            Temporal.Now.instant()
          )
        )
        .map((hour) => hour.screenTemperature)
    );
    return items;
  }

  return items;
};

export default transformMetOfficeJSON;
