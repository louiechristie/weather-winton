import dayjs from 'dayjs';
import axios from 'axios';
import mockDailyMetOfficeJSON from '../tests/mockDailyMetOfficeJSON.mjs';
import generateMockHourlyMetOfficeJSON from '../tests/generateMockHourlyMetOfficeJSON.mjs';
import log from './log.mjs';
import getItemsFromMetOfficeJSON from './transformMetOfficeJSON.mjs';
import transformMetOfficeJSON from './transformMetOfficeJSON.mjs';

const headers = {
  accept: 'application/json',
  apikey: process.env.GATSBY_MET_WEATHER_SECRET,
};

const getMetOfficeForecast = async () => {
  const response = await axios.get(process.env.GATSBY_MET_WEATHER_DAILY_URL, {
    headers,
  });
  // const text = await response.text();
  // log('text: ' + text);
  log(`response.data: ${JSON.stringify(response.data, null, '  ')}`);
  const dailyJson = response.data;
  if (!response) {
    throw new Error('No response from server.');
  }

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

  const items = transformMetOfficeJSON(dailyJson, hourlyJson);
  return items;
};

const getMockForecast = async () => {
  log('getMockForecast');
  return getItemsFromMetOfficeJSON(
    mockDailyMetOfficeJSON(),
    generateMockHourlyMetOfficeJSON(dayjs().toISOString())
  );
};

const getForecast = async () => {
  let items = [];
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.GATSBY_MET_WEATHER_DAILY_URL)
      {throw new Error(
        'You need to set your GATSBY_MET_WEATHER_DAILY_URL environment variable'
      );}
    if (!process.env.GATSBY_MET_WEATHER_HOURLY_URL)
      {throw new Error(
        'You need to set your GATSBY_MET_WEATHER_HOURLY_URL environment variable'
      );}
    if (!process.env.GATSBY_MET_WEATHER_SECRET)
      {throw new Error(
        'You need to set your GATSBY_MET_WEATHER_SECRET environment variable'
      );}
    try {
      items = await getMetOfficeForecast();
    } catch (error) {
      log('Error getting forecast');
      log(error);
      throw error;
    }
  } else {
    try {
      items = await getMockForecast();
    } catch (error) {
      log('Error getting mock forecast');
      log(error);
      throw error;
    }
  }

  return items;
};

export default getForecast;
