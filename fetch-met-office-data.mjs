#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const getHeaders = (metWeatherSecret) => {
  return {
    accept: 'application/json',
    apikey: metWeatherSecret,
  };
};

const preflightCheck = () => {
  const MET_WEATHER_SECRET = process.env.MET_WEATHER_SECRET;
  const MET_WEATHER_DAILY_URL = process.env.MET_WEATHER_DAILY_URL;
  const MET_WEATHER_HOURLY_URL = process.env.MET_WEATHER_HOURLY_URL;

  if (!MET_WEATHER_SECRET) {
    throw new Error(
      'You need to set your MET_WEATHER_SECRET environment variable'
    );
  }
  if (!MET_WEATHER_DAILY_URL) {
    throw new Error('MET_WEATHER_DAILY_URL missing');
  }
  if (!MET_WEATHER_HOURLY_URL) {
    throw new Error('MET_WEATHER_HOURLY_URL missing');
  }

  return {
    MET_WEATHER_SECRET,
    MET_WEATHER_DAILY_URL,
    MET_WEATHER_HOURLY_URL,
  };
};

const getDailyForecast = async (url, apiKey) => {
  const headers = getHeaders(apiKey);
  console.log(`Fetching daily forecast from: ${url}`);

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(
      `Daily forecast fetch failed: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  console.log('✓ Daily forecast fetched successfully');
  return data;
};

const getHourlyForecast = async (url, apiKey) => {
  const headers = getHeaders(apiKey);
  console.log(`Fetching hourly forecast from: ${url}`);

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(
      `Hourly forecast fetch failed: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  console.log('✓ Hourly forecast fetched successfully');
  return data;
};

const main = async () => {
  try {
    console.log('🌤️  Met Office Data Fetcher\n');

    const {
      MET_WEATHER_SECRET,
      MET_WEATHER_DAILY_URL,
      MET_WEATHER_HOURLY_URL,
    } = preflightCheck();

    // Fetch both forecasts in parallel
    const [dailyForecast, hourlyForecast] = await Promise.all([
      getDailyForecast(MET_WEATHER_DAILY_URL, MET_WEATHER_SECRET),
      getHourlyForecast(MET_WEATHER_HOURLY_URL, MET_WEATHER_SECRET),
    ]);

    // Create output directory if needed and save files
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const dataDir = resolve(__dirname, 'data/met-office-snapshots');
    const dailyFile = resolve(dataDir, `daily-${timestamp}.json`);
    const hourlyFile = resolve(dataDir, `hourly-${timestamp}.json`);

    // Create directory (mkdir -p equivalent in Node)
    const { mkdirSync } = await import('fs');
    mkdirSync(dataDir, { recursive: true });

    // Save files
    writeFileSync(dailyFile, JSON.stringify(dailyForecast, null, 2));
    console.log(`✓ Daily forecast saved to: ${dailyFile}`);

    writeFileSync(hourlyFile, JSON.stringify(hourlyForecast, null, 2));
    console.log(`✓ Hourly forecast saved to: ${hourlyFile}`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

main();
