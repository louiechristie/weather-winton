import dayjs from 'dayjs';
import generateMockDailyMetOfficeJSON from '../tests/generateMockDailyMetOfficeJSON';
import generateSpecialDatesDailyMetOfficeJSON from '../tests/generateSpecialDatesMetOfficeJSON';
import generateMockHourlyMetOfficeJSON from '../tests/generateMockHourlyMetOfficeJSON';
import generateStormBramDailyMetOfficeJSON from '../tests/generateStormBramMetOfficeJSON';
import transformMetOfficeJSON from './transformMetOfficeJSON';
import {
  MetOfficeDailyForecastGeoJSON,
  MetOfficeDailyForecastGeoJSONSchema,
  MetOfficeHourlyForecastGeoJSONSchema,
  DailyWeatherData,
} from '../types/metOffice';

import type { Items } from '@/utilities/transformMetOfficeJSON';
import SpecialDate from '../types/specialDate';

import windyDailyForecastJSON from '../../data/windy/windy-daily.json' with { type: 'json' };
import windHourlyForecastJSON from '../../data/windy/windy-hourly.json' with { type: 'json' };

const todayOnwardsFilterMetOfficeJSON = (
  metOfficeJSON: MetOfficeDailyForecastGeoJSON
): MetOfficeDailyForecastGeoJSON => {
  const filtered = structuredClone(metOfficeJSON);
  filtered.features[0].properties.timeSeries = [];

  const days = metOfficeJSON.features[0].properties.timeSeries;
  const daysFiltered = days.filter(justTodayFilter);
  filtered.features[0].properties.timeSeries = daysFiltered;

  return filtered;
};

const justTodayFilter = (day: DailyWeatherData) => {
  return dayjs(day.time).tz().isSameOrAfter(dayjs(), 'day');
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

  const dailyFromTodayJson: MetOfficeDailyForecastGeoJSON =
    todayOnwardsFilterMetOfficeJSON(dailyJson);

  const hourlyResponse = await fetch(process.env.MET_WEATHER_HOURLY_URL, {
    headers,
  });

  if (!hourlyResponse) {
    throw new Error('No hourlyResponse from server.');
  }

  const hourlyJson = await hourlyResponse.json();

  const items = await transformMetOfficeJSON(
    dailyFromTodayJson,
    hourlyJson,
    specialDates
  );
  return items;
};

export const getMockForecast = async (specialDates: SpecialDate[]) => {
  // log('getMockForecast');
  const mockDailyMetOfficeJSON = generateMockDailyMetOfficeJSON();
  const dailyFromTodayJson = todayOnwardsFilterMetOfficeJSON(
    mockDailyMetOfficeJSON
  );
  const mockHourlyMetOfficeJSON = generateMockHourlyMetOfficeJSON(
    dayjs().toISOString()
  );
  return transformMetOfficeJSON(
    dailyFromTodayJson,
    mockHourlyMetOfficeJSON,
    specialDates
  );
};

export const getSpecialDatesForecast = async (specialDates: SpecialDate[]) => {
  // log('getSpecialDatesForecast');
  const specialDatesDailyMetOfficeJSON =
    generateSpecialDatesDailyMetOfficeJSON(specialDates);
  const mockHourlyMetOfficeJSON = generateMockHourlyMetOfficeJSON(
    dayjs().toISOString()
  );
  return transformMetOfficeJSON(
    specialDatesDailyMetOfficeJSON,
    mockHourlyMetOfficeJSON,
    specialDates
  );
};

export const getStormDatesForecast = async (specialDates: SpecialDate[]) => {
  const stormDatesForecast = MetOfficeDailyForecastGeoJSONSchema.parse(
    generateStormBramDailyMetOfficeJSON()
  );
  const mockHourlyMetOfficeJSON = generateMockHourlyMetOfficeJSON(
    dayjs().toISOString()
  );
  return transformMetOfficeJSON(
    stormDatesForecast,
    mockHourlyMetOfficeJSON,
    specialDates
  );
};

export const getWindyForecast = async (specialDates: SpecialDate[]) => {
  const windyDailyForecast = MetOfficeDailyForecastGeoJSONSchema.parse(
    windyDailyForecastJSON
  );

  const windyHourlyForecast = MetOfficeHourlyForecastGeoJSONSchema.parse(
    windHourlyForecastJSON
  );

  return transformMetOfficeJSON(
    windyDailyForecast,
    windyHourlyForecast,
    specialDates
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
