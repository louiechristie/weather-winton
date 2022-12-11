require('dotenv').config();

const fetch = require('node-fetch');

const mockDailyMetOfficeJSON = require('../tests/mockDailyMetOfficeJSON');
const mockHourlyMetOfficeJSON = require('../tests/mockHourlyMetOfficeJSON');
const log = require('./log');
const getItemsFromMetOfficeJSON = require('./metOfficeWeatherUtils');

const headers = {
  accept: 'application/json',
  'x-ibm-client-id': process.env.GATSBY_MET_WEATHER_ID,
  'x-ibm-client-secret': process.env.GATSBY_MET_WEATHER_SECRET,
};

const getMetOfficeForecast = async (url) => {
  log(`url: ${url}`);

  const response = await fetch(url, {
    headers,
  });
  // const text = await response.text();
  // log('text: ' + text);
  log(`response: ${response}`);
  const dailyJson = await response.json();
  if (!response) {
    throw new Error('No response from server.');
  }
  if (!response.ok) {
    throw new Error(JSON.stringify(response, null, '  '));
  }

  const hourlyResponse = await fetch(
    process.env.GATSBY_MET_WEATHER_HOURLY_URL,
    {
      headers,
    }
  );
  // const text = await hourlyResponse.text();
  // log('text: ' + text);
  log(`hourlyResponse: ${hourlyResponse}`);
  const hourlyJson = await hourlyResponse.json();
  if (!hourlyResponse) {
    throw new Error('No hourlyResponse from server.');
  }
  if (!hourlyResponse.ok) {
    throw new Error(JSON.stringify(hourlyResponse, null, '  '));
  }

  const items = getItemsFromMetOfficeJSON(dailyJson, hourlyJson);
  return items;
};

const getMockForecast = async () => {
  log('getMockForecast');
  return getItemsFromMetOfficeJSON(
    mockDailyMetOfficeJSON(),
    mockHourlyMetOfficeJSON()
  );
};

const getForecast = async () => {
  let items = [];
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.GATSBY_MET_WEATHER_DAILY_URL)
      throw new Error(
        'You need to set your GATSBY_MET_WEATHER_DAILY_URL environment variable'
      );
    if (!process.env.GATSBY_MET_WEATHER_ID)
      throw new Error(
        'You need to set your GATSBY_MET_WEATHER_ID environment variable'
      );
    if (!process.env.GATSBY_MET_WEATHER_SECRET)
      throw new Error(
        'You need to set your GATSBY_MET_WEATHER_SECRET environment variable'
      );
    try {
      items = await getMetOfficeForecast(
        process.env.GATSBY_MET_WEATHER_DAILY_URL
      );
    } catch (error) {
      log(error);
    }
  } else {
    try {
      items = await getMockForecast();
    } catch (error) {
      log(error);
    }
  }

  return items;
};

exports.getForecast = getForecast;
