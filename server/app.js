require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const mockDailyMetOfficeJSON = require('./tests/mockDailyMetOfficeJSON');
const mockHourlyMetOfficeJSON = require('./tests/mockHourlyMetOfficeJSON');
const log = require('./utilities/log');
const getItemsFromMetOfficeJSON = require('./utilities/metOfficeWeatherUtils');

const app = express();

const metOfficeDailyWeatherUrl = process.env.MET_WEATHER_DAILY_URL;
const metOfficeHourlyWeatherUrl = process.env.MET_WEATHER_HOURLY_URL;

const headers = {
  accept: 'application/json',
  'x-ibm-client-id': process.env.MET_WEATHER_ID,
  'x-ibm-client-secret': process.env.MET_WEATHER_SECRET,
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public/')));

app.get('/', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '/public/', 'index.html'));
    res.setHeader('Cache-Control', `public, max-age=${60 * 60}`);
    res.setHeader('Last-Modified', new Date().toUTCString());
  } catch (error) {
    log(error);
    res.setHeader('Cache-Control', 'public, max-age=1');
    res.setHeader('Last-Modified', new Date().toUTCString());
    res.send(JSON.stringify(error));
  }
});

const getForecast = async (url) => {
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

  const hourlyResponse = await fetch(metOfficeHourlyWeatherUrl, {
    headers,
  });
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

app.get('/forecast', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    try {
      const items = await getForecast(metOfficeDailyWeatherUrl);
      res.setHeader('Cache-Control', 'public, max-age=21600');
      res.setHeader('Last-Modified', new Date().toUTCString());
      res.json(items);
    } catch (error) {
      log(error);
      res.setHeader('Cache-Control', 'public, max-age=1');
      res.setHeader('Last-Modified', new Date().toUTCString());
      res.send(JSON.stringify(error));
    }
  } else {
    try {
      const items = await getMockForecast();
      res.setHeader('Cache-Control', 'public, max-age=1');
      res.setHeader('Last-Modified', new Date().toUTCString());
      res.json(items);
    } catch (error) {
      log(error);
      res.setHeader('Cache-Control', 'public, max-age=1');
      res.setHeader('Last-Modified', new Date().toUTCString());
      res.send(JSON.stringify(error));
    }
  }
});

const port = process.env.PORT || 5001;
app.listen(port);

log(`Node environment: ${process.env.NODE_ENV}`);
log(`Listening on port: ${port}`);

module.exports = app;
