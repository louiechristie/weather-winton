#!/usr/bin/env node
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const DAILY_URL = process.env.MET_WEATHER_DAILY_URL;
const HOURLY_URL = process.env.MET_WEATHER_HOURLY_URL;

async function fetchAndCache() {
  if (!DAILY_URL || !HOURLY_URL) {
    console.error(
      'MET_WEATHER_DAILY_URL/MET_WEATHER_HOURLY_URL are required to cache.'
    );
    process.exit(1);
  }
  if (!process.env.MET_WEATHER_SECRET) {
    console.error(
      'MET_WEATHER_SECRET is required to request Met Office Data Hub.'
    );
    process.exit(1);
  }

  const headers = {
    accept: 'application/json',
    apikey: process.env.MET_WEATHER_SECRET,
  };

  const dailyRes = await fetch(DAILY_URL, { headers });
  if (!dailyRes.ok) {
    throw new Error('Failed fetching daily data: ' + dailyRes.status);
  }
  const dailyJson = await dailyRes.json();

  const hourlyRes = await fetch(HOURLY_URL, { headers });
  if (!hourlyRes.ok) {
    throw new Error('Failed fetching hourly data: ' + hourlyRes.status);
  }
  const hourlyJson = await hourlyRes.json();

  const outDir = path.resolve(process.cwd(), 'data', 'daily');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.resolve(outDir, 'cached-daily.json'),
    JSON.stringify(dailyJson, null, 2)
  );
  fs.writeFileSync(
    path.resolve(outDir, 'cached-hourly.json'),
    JSON.stringify(hourlyJson, null, 2)
  );
  console.log('Wrote cache files to', outDir);
  return { dailyJson, hourlyJson };
}

if (process.argv[1] && process.argv[1].endsWith('cacheMetOffice.mjs')) {
  fetchAndCache().catch((err) => {
    console.error('Failed to cache data', err);
    process.exit(1);
  });
}

export default fetchAndCache;
