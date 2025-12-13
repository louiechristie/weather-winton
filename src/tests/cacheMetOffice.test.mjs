import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const outDir = path.resolve(process.cwd(), 'data', 'daily');
const cachedDaily = path.resolve(outDir, 'cached-daily.json');
const cachedHourly = path.resolve(outDir, 'cached-hourly.json');

describe('cacheMetOffice script', () => {
  let priorDaily = null;
  let priorHourly = null;

  beforeAll(() => {
    if (fs.existsSync(cachedDaily))
      priorDaily = fs.readFileSync(cachedDaily, 'utf8');
    if (fs.existsSync(cachedHourly))
      priorHourly = fs.readFileSync(cachedHourly, 'utf8');
    // No prior env capture; tests will set necessary env vars explicitly.
  });

  afterAll(() => {
    // Unset test envs
    process.env.MET_WEATHER_DAILY_URL = '';
    process.env.MET_WEATHER_HOURLY_URL = '';
    process.env.MET_WEATHER_SECRET = '';
    if (priorDaily !== null) fs.writeFileSync(cachedDaily, priorDaily, 'utf8');
    else if (fs.existsSync(cachedDaily)) fs.unlinkSync(cachedDaily);
    if (priorHourly !== null)
      fs.writeFileSync(cachedHourly, priorHourly, 'utf8');
    else if (fs.existsSync(cachedHourly)) fs.unlinkSync(cachedHourly);
  });

  test('writes cached daily and hourly JSON when env set', async () => {
    process.env.MET_WEATHER_DAILY_URL = 'https://example.local/daily';
    process.env.MET_WEATHER_HOURLY_URL = 'https://example.local/hourly';
    process.env.MET_WEATHER_SECRET = 'abc123';

    const sampleDaily = { meta: { name: 'daily' }, features: [] };
    const sampleHourly = { meta: { name: 'hourly' }, features: [] };

    // Mock fetch with a small call tracker
    const calls = [];
    global.fetch = async (url, opts) => {
      calls.push([url, opts]);
      if (url === process.env.MET_WEATHER_DAILY_URL) {
        return { ok: true, json: async () => sampleDaily };
      }
      if (url === process.env.MET_WEATHER_HOURLY_URL) {
        return { ok: true, json: async () => sampleHourly };
      }
      return { ok: false, status: 404 };
    };

    const modulePath =
      pathToFileURL(
        path.resolve(process.cwd(), 'scripts', 'cacheMetOffice.mjs')
      ).href +
      '?t=' +
      Date.now();
    const m = await import(modulePath);
    const result = await m.default();

    expect(result.dailyJson).toEqual(sampleDaily);
    expect(result.hourlyJson).toEqual(sampleHourly);

    expect(fs.existsSync(cachedDaily)).toBe(true);
    expect(fs.existsSync(cachedHourly)).toBe(true);
    const d = JSON.parse(fs.readFileSync(cachedDaily, 'utf8'));
    const h = JSON.parse(fs.readFileSync(cachedHourly, 'utf8'));
    expect(d).toEqual(sampleDaily);
    expect(h).toEqual(sampleHourly);

    // ensure apikey header used
    expect(calls.length).toBe(2);
    const headers = calls[0][1].headers;
    expect(headers.apikey).toEqual(process.env.MET_WEATHER_SECRET);
  });

  test('exits with non-zero code when urls are missing', async () => {
    // intentionally blank env vars for this test
    process.env.MET_WEATHER_DAILY_URL = '';
    process.env.MET_WEATHER_HOURLY_URL = '';
    process.env.MET_WEATHER_SECRET = '';

    // import via child process since dotenv/config will load .env
    const { spawnSync } = await import('child_process');
    const cp = spawnSync('node', ['./scripts/cacheMetOffice.mjs'], {
      cwd: process.cwd(),
      env: { ...process.env },
      encoding: 'utf8',
    });
    expect(cp.status).toBe(1);
    expect(cp.stderr + cp.stdout).toMatch(
      /MET_WEATHER_DAILY_URL\/MET_WEATHER_HOURLY_URL are required to cache/
    );
  });
});

export {};
