import transformMetOfficeJSON from './transformMetOfficeJSON';
import generateStormBramDailyMetOfficeJSON from '../tests/generateStormBramMetOfficeJSON';
import { MetOfficeDailyForecastGeoJSON } from '../types/metOffice';
import fs from 'fs';
import path from 'path';
import generateMockHourlyMetOfficeJSON from '../tests/generateMockHourlyMetOfficeJSON';
import SpecialDate from '../types/specialDate';
import dayjs from 'dayjs';

describe('transformMetOfficeJSON - storm dates', () => {
  test('should attach stormName Bram when input dates match season_effects', async () => {
    const dailyOriginal =
      generateStormBramDailyMetOfficeJSON() as MetOfficeDailyForecastGeoJSON;

    // Ensure the first item corresponds to today so transformMetOfficeJSON can
    // calculate the day-specific averages using hourly time series without throwing
    const daily = structuredClone(dailyOriginal);
    const todayMock = structuredClone(
      daily.features[0].properties.timeSeries[0]
    );
    todayMock.time = dayjs().startOf('day').toISOString();
    // light defaults for today
    todayMock.dayMaxScreenTemperature = 10;
    todayMock.nightMinScreenTemperature = 5;
    daily.features[0].properties.timeSeries.unshift(todayMock);

    const hourly = generateMockHourlyMetOfficeJSON(dayjs().toISOString());

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
    const items = await transformMetOfficeJSON(
      daily,
      hourly,
      [] as SpecialDate[],
      storms
    );

    const bramItems = items.filter((i) => i.stormName === 'Bram');
    expect(bramItems.length).toBeGreaterThan(0);
    for (const bi of bramItems) {
      expect(bi.stormName).toEqual('Bram');
    }
  });
});
