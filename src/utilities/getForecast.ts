import { Temporal } from 'temporal-polyfill';

import generateMockDailyMetOfficeJSON from '../tests/generateMockDailyMetOfficeJSON';
import generateSpecialDatesDailyMetOfficeJSON from '../tests/generateSpecialDatesMetOfficeJSON';
import generateMockHourlyMetOfficeJSON from '../tests/generateMockHourlyMetOfficeJSON';
import generateStormBramDailyMetOfficeJSON from '../tests/generateStormBramMetOfficeJSON';
import transformMetOfficeJSON from './transformMetOfficeJSON';
import {
  MetOfficeDailyForecastGeoJSON,
  MetOfficeDailyForecastGeoRawJSON,
  MetOfficeDailyForecastGeoJSONSchema,
  MetOfficeDailyForecastGeoJSONRawSchema,
  MetOfficeHourlyForecastGeoJSONSchema,
  DailyWeatherPreviousNightData,
  DailyWeatherData,
} from '../types/metOffice';

import type { Items } from '@/utilities/transformMetOfficeJSON';
import SpecialDate from '../types/specialDate';

import looneyDailyForecastJSON from '../../data/looney/looney-daily.json' with { type: 'json' };
import windyDailyForecastJSON from '../../data/windy/windy-daily.json' with { type: 'json' };
import heatwaveDailyForecastJSON from '../../data/heatwave/heatwave-daily.json' with { type: 'json' };

const now = Temporal.Now.instant();
const nowString = now.toString();
const mockHourlyMetOfficeJSON = generateMockHourlyMetOfficeJSON(nowString);
const systemTimeZone = Temporal.Now.timeZoneId();
const nowZoned = Temporal.Now.zonedDateTimeISO(systemTimeZone);

const todayOnwardsFilterMetOfficeJSON = (
  metOfficeJSON:
    | MetOfficeDailyForecastGeoRawJSON
    | MetOfficeDailyForecastGeoJSON
): MetOfficeDailyForecastGeoJSON => {
  const filtered: MetOfficeDailyForecastGeoJSON = structuredClone(
    metOfficeJSON
  ) as MetOfficeDailyForecastGeoJSON;

  const days = metOfficeJSON.features[0].properties.timeSeries;
  const daysFiltered: DailyWeatherData[] = days.filter(
    todayOnwardsFilter
  ) as DailyWeatherData[];

  filtered.features[0].properties.timeSeries = daysFiltered;

  return filtered;
};

const todayOnwardsFilter = (
  day: DailyWeatherPreviousNightData | DailyWeatherData
) => {
  const nowPlainDate = nowZoned.toPlainDate();

  const time = day.time;
  const timeInstant = Temporal.Instant.from(time);
  const timeZoned = timeInstant.toZonedDateTimeISO(systemTimeZone);
  const timePlainDate = timeZoned.toPlainDate();

  return Temporal.PlainDateTime.compare(timePlainDate, nowPlainDate) >= 0;
};

if (!process.env.MET_WEATHER_SECRET) {
  throw new Error(
    'You need to set your MET_WEATHER_SECRET environment variable'
  );
}

const headers: HeadersInit = {
  // prettier-ignore
  'accept': 'application/json',
  // prettier-ignore
  'apikey': process.env.MET_WEATHER_SECRET,
};

const getMetOfficeForecast = async (specialDates: SpecialDate[]) => {
  if (!process.env.MET_WEATHER_DAILY_URL) {
    throw new Error('MET_WEATHER_DAILY_URL missing');
  }
  if (!process.env.MET_WEATHER_HOURLY_URL) {
    throw new Error('MET_WEATHER_HOURLY_URL missing');
  }
  const response = await fetch(process.env.MET_WEATHER_DAILY_URL, {
    headers,
  });
  // const text = await response.text();
  // log('text: ' + text);
  if (!response) {
    throw new Error('No response from server.');
  }
  // log(`response.data: ${JSON.stringify(response.data, null, '  ')}`);

  const dailyJson: MetOfficeDailyForecastGeoJSON = await response.json();

  const dailyForecastRaw =
    MetOfficeDailyForecastGeoJSONRawSchema.parse(dailyJson);

  const dailyFromTodayJson: MetOfficeDailyForecastGeoJSON =
    todayOnwardsFilterMetOfficeJSON(dailyForecastRaw);

  const dailyForecast =
    MetOfficeDailyForecastGeoJSONSchema.parse(dailyFromTodayJson);

  const hourlyResponse = await fetch(process.env.MET_WEATHER_HOURLY_URL, {
    headers,
  });

  if (!hourlyResponse) {
    throw new Error('No hourlyResponse from server.');
  }

  const hourlyJson = await hourlyResponse.json();

  const hourlyForecast = MetOfficeHourlyForecastGeoJSONSchema.parse(hourlyJson);

  const items = transformMetOfficeJSON(
    specialDates,
    dailyForecast,
    hourlyForecast,
    now
  );
  return items;
};

export const getMockForecast = async (specialDates: SpecialDate[]) => {
  // log('getMockForecast');
  const mockDailyMetOfficeJSON = generateMockDailyMetOfficeJSON(now);
  const dailyFromTodayJson = todayOnwardsFilterMetOfficeJSON(
    mockDailyMetOfficeJSON
  );

  const dailyForecast =
    MetOfficeDailyForecastGeoJSONSchema.parse(dailyFromTodayJson);

  const mockHourlyMetOfficeJSON = generateMockHourlyMetOfficeJSON(nowString);

  const hourlyForecast = MetOfficeHourlyForecastGeoJSONSchema.parse(
    mockHourlyMetOfficeJSON
  );

  const items = transformMetOfficeJSON(
    specialDates,
    dailyForecast,
    hourlyForecast,
    now
  );
  return items;
};

export const getSpecialDatesForecast = async (specialDates: SpecialDate[]) => {
  // log('getSpecialDatesForecast');
  const specialDatesDailyMetOfficeJSON =
    generateSpecialDatesDailyMetOfficeJSON(specialDates);
  const dailyForecast = MetOfficeDailyForecastGeoJSONSchema.parse(
    specialDatesDailyMetOfficeJSON
  );
  const mockHourlyMetOfficeJSON = generateMockHourlyMetOfficeJSON(nowString);
  return transformMetOfficeJSON(
    specialDates,
    dailyForecast,
    mockHourlyMetOfficeJSON,
    now
  );
};

export const getStormDatesForecast = async (specialDates: SpecialDate[]) => {
  const stormDatesForecast = MetOfficeDailyForecastGeoJSONSchema.parse(
    generateStormBramDailyMetOfficeJSON()
  );
  return transformMetOfficeJSON(
    specialDates,
    stormDatesForecast,
    mockHourlyMetOfficeJSON,
    now
  );
};

export const getLooneyForecast = async (specialDates: SpecialDate[]) => {
  const looneyDailyForecast = MetOfficeDailyForecastGeoJSONSchema.parse(
    looneyDailyForecastJSON
  );

  return transformMetOfficeJSON(
    specialDates,
    looneyDailyForecast,
    mockHourlyMetOfficeJSON,
    now
  );
};

export const getWindyForecast = async (specialDates: SpecialDate[]) => {
  const windyDailyForecast = MetOfficeDailyForecastGeoJSONSchema.parse(
    windyDailyForecastJSON
  );

  return transformMetOfficeJSON(
    specialDates,
    windyDailyForecast,
    mockHourlyMetOfficeJSON,
    now
  );
};

export const getHeatWaveForecast = async (specialDates: SpecialDate[]) => {
  const heatwaveDailyForecast = MetOfficeDailyForecastGeoJSONSchema.parse(
    heatwaveDailyForecastJSON
  );

  return transformMetOfficeJSON(
    specialDates,
    heatwaveDailyForecast,
    mockHourlyMetOfficeJSON,
    now
  );
};

const getForecast = async (specialDates: SpecialDate[]): Promise<Items> => {
  let items: Items = [];

  try {
    items = await getMetOfficeForecast(specialDates);
  } catch (error) {
    console.error('Error getting forecast');
    console.error(error);
    throw error;
  }

  return items;
};

export default getForecast;
