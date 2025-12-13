/* eslint-disable import-x/first */
import fs from 'fs';
import path from 'path';
import generateMockDailyMetOfficeJSON from './generateMockDailyMetOfficeJSON';
import generateMockHourlyMetOfficeJSON from './generateMockHourlyMetOfficeJSON';
// Set env var before importing the module to ensure it reads the cached mode.
process.env.MET_WEATHER_USE_CACHE = 'true';
import getForecast from '../utilities/getForecast';

describe('getForecast cache mode', () => {
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
  let priorDaily = null;
  let priorHourly = null;

  beforeAll(() => {
    if (fs.existsSync(dailyCacheFile))
      priorDaily = fs.readFileSync(dailyCacheFile, 'utf8');
    if (fs.existsSync(hourlyCacheFile))
      priorHourly = fs.readFileSync(hourlyCacheFile, 'utf8');
    // Write cache files
    const dailyJson = generateMockDailyMetOfficeJSON();
    const hourlyJson = generateMockHourlyMetOfficeJSON(
      dailyJson.features[0].properties.timeSeries[0].time
    );
    fs.mkdirSync(path.dirname(dailyCacheFile), { recursive: true });
    fs.writeFileSync(dailyCacheFile, JSON.stringify(dailyJson, null, 2));
    fs.writeFileSync(hourlyCacheFile, JSON.stringify(hourlyJson, null, 2));
  });

  afterAll(() => {
    if (priorDaily !== null)
      fs.writeFileSync(dailyCacheFile, priorDaily, 'utf8');
    else if (fs.existsSync(dailyCacheFile)) fs.unlinkSync(dailyCacheFile);
    if (priorHourly !== null)
      fs.writeFileSync(hourlyCacheFile, priorHourly, 'utf8');
    else if (fs.existsSync(hourlyCacheFile)) fs.unlinkSync(hourlyCacheFile);
    // Clean up: unset cache flag
    delete process.env.MET_WEATHER_USE_CACHE;
  });

  test('returns items using cached files', async () => {
    process.env.MET_WEATHER_USE_CACHE = 'true';
    const items = await getForecast([]);
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThan(0);
  });
});
