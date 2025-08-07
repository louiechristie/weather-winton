import dayjs from 'dayjs';
import axios from 'axios';
import generateMockDailyMetOfficeJSON from '../tests/generateMockDailyMetOfficeJSON.mjs';
import generateSpecialDatesDailyMetOfficeJSON from '../tests/generateSpecialDatesMetOfficeJSON.mjs';
import generateMockHourlyMetOfficeJSON from '../tests/generateMockHourlyMetOfficeJSON.mjs';
import log from './log.mjs';
import transformMetOfficeJSON from './transformMetOfficeJSON.ts';
import stormTestDailyForecast from './stormTestDailyForecast.mjs';
import stormTestHourlyForecast from './stormTestHourlyForecast.mjs';

import type { items } from '@/utilities/transformMetOfficeJSON';

const todayOnwardsFilterMetOfficeJSON = (metOfficeJSON) => {
  const filtered = structuredClone(metOfficeJSON);
  filtered.features[0].properties.timeSeries = [];

  const days = metOfficeJSON.features[0].properties.timeSeries;
  const daysFiltered = days.filter(justTodayFilter);
  filtered.features[0].properties.timeSeries = daysFiltered;

  return filtered;
};

const justTodayFilter = (day) => {
  return dayjs(day.time).tz().isSameOrAfter(dayjs(), 'day');
};

const headers = {
  accept: 'application/json',
  apikey: process.env.GATSBY_MET_WEATHER_SECRET,
};

const getMetOfficeForecast = async (specialDates) => {
  const response = await axios.get(process.env.GATSBY_MET_WEATHER_DAILY_URL, {
    headers,
  });
  // const text = await response.text();
  // log('text: ' + text);
  if (!response) {
    throw new Error('No response from server.');
  }
  // log(`response.data: ${JSON.stringify(response.data, null, '  ')}`);

  const dailyJson = response.data;
  const dailyFromTodayJson = todayOnwardsFilterMetOfficeJSON(dailyJson);

  const hourlyResponse = await axios.get(
    process.env.GATSBY_MET_WEATHER_HOURLY_URL,
    {
      headers,
    }
  );
  // const text = await hourlyResponse.text();
  // log('text: ' + text);
  log(
    `hourlyResponse.data: ${JSON.stringify(hourlyResponse.data, null, '  ')}`
  );
  const hourlyJson = hourlyResponse.data;
  if (!hourlyResponse) {
    throw new Error('No hourlyResponse from server.');
  }

  const items = await transformMetOfficeJSON(
    dailyFromTodayJson,
    hourlyJson,
    specialDates
  );
  return items;
};

export const getMockForecast = async (specialDates) => {
  log('getMockForecast');
  const mockDailyMetOfficeJSON = generateMockDailyMetOfficeJSON(specialDates);
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

export const getSpecialDatesForecast = async (specialDates) => {
  log('getSpecialDatesForecast');
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

export const getStormForecast = async (specialDates) => {
  log('getStormForecast');

  const transformedMetOfficeJSON = await transformMetOfficeJSON(
    stormTestDailyForecast,
    stormTestHourlyForecast,
    specialDates
  );

  return transformedMetOfficeJSON;
};

const getForecast = async (specialDates): Promise<items> => {
  let items = [];
  if (process.env.NODE_ENV === 'production' || true) {
    if (!process.env.GATSBY_MET_WEATHER_DAILY_URL) {
      throw new Error(
        'You need to set your GATSBY_MET_WEATHER_DAILY_URL environment variable'
      );
    }
    if (!process.env.GATSBY_MET_WEATHER_HOURLY_URL) {
      throw new Error(
        'You need to set your GATSBY_MET_WEATHER_HOURLY_URL environment variable'
      );
    }
    if (!process.env.GATSBY_MET_WEATHER_SECRET) {
      throw new Error(
        'You need to set your GATSBY_MET_WEATHER_SECRET environment variable'
      );
    }
    try {
      items = await getMetOfficeForecast(specialDates);
    } catch (error) {
      log('Error getting forecast');
      log(error);
      throw error;
    }
  } else {
  }

  return items;
};

export default getForecast;
