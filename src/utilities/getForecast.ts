import dayjs from 'dayjs';
import fs from 'fs';
import path from 'path';
import generateMockDailyMetOfficeJSON from '../tests/generateMockDailyMetOfficeJSON';
import generateSpecialDatesDailyMetOfficeJSON from '../tests/generateSpecialDatesMetOfficeJSON';
import generateMockHourlyMetOfficeJSON from '../tests/generateMockHourlyMetOfficeJSON';
import generateStormBramDailyMetOfficeJSON from '../tests/generateStormBramMetOfficeJSON';
import transformMetOfficeJSON from './transformMetOfficeJSON';
import {
  MetOfficeDailyForecastGeoJSONSchema,
  MetOfficeDailyForecastGeoJSON,
  MetOfficeHourlyForecastGeoJSON,
  DailyWeatherData,
} from '../types/metOffice';

import type { Items } from '@/utilities/transformMetOfficeJSON';
import SpecialDate from '../types/specialDate';

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

// MET_WEATHER_SECRET is only required when not using cached JSON

const headers: HeadersInit = {
  // prettier-ignore
  'accept': 'application/json',
  // prettier-ignore
  'apikey': process.env.MET_WEATHER_SECRET ?? '',
};

const getMetOfficeForecast = async (specialDates: SpecialDate[]) => {
  const useCache = process.env.MET_WEATHER_USE_CACHE === 'true';
  if (!useCache) {
    if (!process.env.MET_WEATHER_DAILY_URL) {
      throw new Error('MET_WEATHER_DAILY_URL missing');
    }
    if (!process.env.MET_WEATHER_HOURLY_URL) {
      throw new Error('MET_WEATHER_HOURLY_URL missing');
    }
  }
  let dailyJson: MetOfficeDailyForecastGeoJSON;
  let hourlyJson: MetOfficeHourlyForecastGeoJSON;

  if (useCache) {
    const dailyCacheFile = path.resolve(
      process.cwd(),
      'data',
      'daily',
      'cached-daily.json'
    );
    const hourlyCacheFile = path.resolve(
      process.cwd(),
      'data',
      'daily',
      'cached-hourly.json'
    );
    if (!fs.existsSync(dailyCacheFile) || !fs.existsSync(hourlyCacheFile)) {
      throw new Error(
        'Cache files missing; run npm run cache-metoffice or unset MET_WEATHER_USE_CACHE'
      );
    }
    dailyJson = JSON.parse(
      fs.readFileSync(dailyCacheFile, 'utf8')
    ) as MetOfficeDailyForecastGeoJSON;
    hourlyJson = JSON.parse(
      fs.readFileSync(hourlyCacheFile, 'utf8')
    ) as MetOfficeHourlyForecastGeoJSON;
  } else {
    if (!process.env.MET_WEATHER_SECRET) {
      throw new Error(
        'You need to set your MET_WEATHER_SECRET environment variable'
      );
    }
    const dailyUrl = process.env.MET_WEATHER_DAILY_URL as string;
    const hourlyUrl = process.env.MET_WEATHER_HOURLY_URL as string;
    const response = await fetch(dailyUrl, {
      headers,
    });
    if (!response) {
      throw new Error('No response from server.');
    }
    dailyJson = await response.json();

    const hourlyResponse = await fetch(hourlyUrl, {
      headers,
    });
    if (!hourlyResponse) {
      throw new Error('No hourlyResponse from server.');
    }
    hourlyJson = await hourlyResponse.json();
  }
  const dailyFromTodayJson: MetOfficeDailyForecastGeoJSON =
    todayOnwardsFilterMetOfficeJSON(dailyJson);

  const stormsFile = path.resolve(
    process.cwd(),
    'data',
    'storms',
    'season_effects.json'
  );
  let storms: {
    name: string;
    dateRaw?: string;
    start?: string | null;
    end?: string | null;
  }[] = [];
  try {
    if (fs.existsSync(stormsFile)) {
      storms = JSON.parse(fs.readFileSync(stormsFile, 'utf8'));
    }
  } catch (e) {
    // ignore
  }

  const items = await transformMetOfficeJSON(
    dailyFromTodayJson,
    hourlyJson,
    specialDates,
    storms
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
  const stormsFile = path.resolve(
    process.cwd(),
    'data',
    'storms',
    'season_effects.json'
  );
  let storms: {
    name: string;
    dateRaw?: string;
    start?: string | null;
    end?: string | null;
  }[] = [];
  try {
    if (fs.existsSync(stormsFile)) {
      storms = JSON.parse(fs.readFileSync(stormsFile, 'utf8'));
    }
  } catch (e) {}
  return transformMetOfficeJSON(
    dailyFromTodayJson,
    mockHourlyMetOfficeJSON,
    specialDates,
    storms
  );
};

export const getSpecialDatesForecast = async (specialDates: SpecialDate[]) => {
  // log('getSpecialDatesForecast');
  const specialDatesDailyMetOfficeJSON =
    generateSpecialDatesDailyMetOfficeJSON(specialDates);
  const mockHourlyMetOfficeJSON = generateMockHourlyMetOfficeJSON(
    dayjs().toISOString()
  );
  const stormsFile = path.resolve(
    process.cwd(),
    'data',
    'storms',
    'season_effects.json'
  );
  let storms: {
    name: string;
    dateRaw?: string;
    start?: string | null;
    end?: string | null;
  }[] = [];
  try {
    if (fs.existsSync(stormsFile)) {
      storms = JSON.parse(fs.readFileSync(stormsFile, 'utf8'));
    }
  } catch (e) {}
  return transformMetOfficeJSON(
    specialDatesDailyMetOfficeJSON,
    mockHourlyMetOfficeJSON,
    specialDates,
    storms
  );
};

export const getStormDatesForecast = async (specialDates: SpecialDate[]) => {
  const stormDatesForecast = MetOfficeDailyForecastGeoJSONSchema.parse(
    generateStormBramDailyMetOfficeJSON()
  );
  const mockHourlyMetOfficeJSON = generateMockHourlyMetOfficeJSON(
    dayjs().toISOString()
  );
  const stormsFile = path.resolve(
    process.cwd(),
    'data',
    'storms',
    'season_effects.json'
  );
  let storms: {
    name: string;
    dateRaw?: string;
    start?: string | null;
    end?: string | null;
  }[] = [];
  try {
    if (fs.existsSync(stormsFile)) {
      storms = JSON.parse(fs.readFileSync(stormsFile, 'utf8'));
    }
  } catch (e) {}
  return transformMetOfficeJSON(
    stormDatesForecast,
    mockHourlyMetOfficeJSON,
    specialDates,
    storms
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
