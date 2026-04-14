import { describe, expect, test } from '@jest/globals';
import { Temporal } from 'temporal-polyfill';

import hourly from '../tests/hourly.json' with { type: 'json' };
import hourlyForBetween2300AndMidnightTestingJSON from '../tests/hourlyForBetween2300AndMidnightTesting.json' with { type: 'json' };
import getAverageTemperatureFromHourly from './getAverageTemperatureFromHourly';
import generateMockHourlyMetOfficeJSON from '../tests/generateMockHourlyMetOfficeJSON';
import { getIsHourInTheRemainingDay } from './getIsHourInTheRemainingDay';
import { jest } from '@jest/globals';
import { MetOfficeHourlyForecastGeoJSONSchema } from '../types/metOffice';

const average = (array: number[]) =>
  array.reduce((a, b) => a + b) / array.length;

test('test default generateMockHourlyMetOfficeJSON from hourly file', () => {
  const testData = structuredClone(hourly);

  const hourlyForecast = MetOfficeHourlyForecastGeoJSONSchema.parse(testData);
  const timeNow = Temporal.Instant.from('2024-06-08T06:19Z');

  const expectedTemperatures = [
    11.35, 12.4, 13.49, 13.95, 14.7, 15.86, 16.16, 15.72, 16.25, 17.2, 17.67,
    17.95, 17.76, 16.84, 15.64, 14.69, 13.78,
  ];

  const expectedAverageTemperature = average(expectedTemperatures);

  expect(getAverageTemperatureFromHourly(hourlyForecast, timeNow)).toBeCloseTo(
    expectedAverageTemperature
  );
});

test('test all 21 degrees', () => {
  const testData = generateMockHourlyMetOfficeJSON();

  testData.features[0].properties.timeSeries =
    testData.features[0].properties.timeSeries.map((hour) => {
      return {
        ...hour,
        screenTemperature: 21,
      };
    });

  const time = Temporal.Instant.from(
    testData.features[0].properties.timeSeries[0].time
  );

  expect(getAverageTemperatureFromHourly(testData, time)).toBe(21);
});

test('test all after now are 18 degrees', () => {
  const now = Temporal.Now.instant();
  const nowZonedDateTime = now.toZonedDateTimeISO(Temporal.Now.timeZoneId());
  const todayTenPm = nowZonedDateTime.with({ hour: 22 });
  const todayTenPmPlainTime = todayTenPm.toPlainDateTime();
  const todayTenPmInstant = todayTenPm.toInstant();

  const yyyy = todayTenPmPlainTime.year.toString();
  const mm = todayTenPmPlainTime.month.toString().padStart(2, '0');
  const dd = todayTenPmPlainTime.day.toString().padStart(2, '0');
  const hh = todayTenPmPlainTime.hour.toString().padStart(2, '0');
  const min = todayTenPmPlainTime.minute.toString().padStart(2, '0');

  const nowString = `${yyyy}-${mm}-${dd}T${hh}:${min}Z`;

  const testData = generateMockHourlyMetOfficeJSON(nowString);

  testData.features[0].properties.timeSeries =
    testData.features[0].properties.timeSeries.map((hour) => {
      const hourTime = Temporal.Instant.from(hour.time);
      const isHourInRemainingDay = getIsHourInTheRemainingDay(
        hourTime,
        todayTenPmInstant
      );
      if (isHourInRemainingDay) {
        return {
          ...hour,
          screenTemperature: 18,
        };
      } else return hour;
    });

  expect(getAverageTemperatureFromHourly(testData, todayTenPmInstant)).toBe(18);
});

describe('test around the edge case of 11pm to midnight', () => {
  const hourlyForBetween2300AndMidnightTesting =
    MetOfficeHourlyForecastGeoJSONSchema.parse(
      hourlyForBetween2300AndMidnightTestingJSON
    );
  const timeNowForBetween2300AndMidnightTesting = Temporal.Instant.from(
    '2024-06-11T23:06:00+0100'
  );

  test('a few mins after 11pm', () => {
    jest.useFakeTimers().setSystemTime(new Date('2024-06-11T23:06:00+0100'));

    const timeNow = Temporal.Instant.from('2024-06-11T23:06:00+0100');

    expect(() => {
      return getAverageTemperatureFromHourly(
        hourlyForBetween2300AndMidnightTesting,
        timeNow
      );
    }).not.toThrow();

    expect(
      getAverageTemperatureFromHourly(
        hourlyForBetween2300AndMidnightTesting,
        timeNowForBetween2300AndMidnightTesting
      )
    ).toBe(12.26);
  });

  test('one second after 11pm', () => {
    expect(() => {
      return getAverageTemperatureFromHourly(
        hourlyForBetween2300AndMidnightTesting,
        Temporal.Instant.from('2024-06-11T23:00:01+0100')
      );
    }).not.toThrow();

    expect(
      getAverageTemperatureFromHourly(
        hourlyForBetween2300AndMidnightTesting,
        Temporal.Instant.from('2024-06-11T23:00:01+0100')
      )
    ).toBe(12.26);
  });

  test('one second till midnight', () => {
    expect(() => {
      return getAverageTemperatureFromHourly(
        hourlyForBetween2300AndMidnightTesting,
        Temporal.Instant.from('2024-06-11T23:59:59+0100')
      );
    }).not.toThrow();
  });

  test('midnight', () => {
    expect(() => {
      return getAverageTemperatureFromHourly(
        hourlyForBetween2300AndMidnightTesting,
        Temporal.Instant.from('2024-06-12T00:00:00+0100')
      );
    }).not.toThrow();
  });

  test('one second after midnight', () => {
    expect(() => {
      return getAverageTemperatureFromHourly(
        hourlyForBetween2300AndMidnightTesting,
        Temporal.Instant.from('2024-06-12T00:00:01+0100')
      );
    }).not.toThrow();
  });

  test('one minute after 11pm', () => {
    expect(() => {
      return getAverageTemperatureFromHourly(
        hourlyForBetween2300AndMidnightTesting,
        Temporal.Instant.from('2024-06-11T23:01:00+0100')
      );
    }).not.toThrow();
  });

  test('one minute till midnight', () => {
    expect(() => {
      return getAverageTemperatureFromHourly(
        hourlyForBetween2300AndMidnightTesting,
        Temporal.Instant.from('2024-06-11T23:59:00+0100')
      );
    }).not.toThrow();
  });

  test('one minute after midnight', () => {
    expect(() => {
      return getAverageTemperatureFromHourly(
        hourlyForBetween2300AndMidnightTesting,
        Temporal.Instant.from('2024-06-12T00:01:00+0100')
      );
    }).not.toThrow();
  });

  test('a 15 mins after 11pm', () => {
    expect(() => {
      return getAverageTemperatureFromHourly(
        hourlyForBetween2300AndMidnightTesting,
        Temporal.Instant.from('2024-06-11T23:15:00+0100')
      );
    }).not.toThrow();
  });

  test('a 29 mins after 11pm', () => {
    expect(() => {
      return getAverageTemperatureFromHourly(
        hourlyForBetween2300AndMidnightTesting,
        Temporal.Instant.from('2024-06-11T23:29:00+0100')
      );
    }).not.toThrow();
  });

  test('a 30 mins after 11pm', () => {
    expect(() => {
      return getAverageTemperatureFromHourly(
        hourlyForBetween2300AndMidnightTesting,
        Temporal.Instant.from('2024-06-11T23:30:00+0100')
      );
    }).not.toThrow();
  });

  test('a 31 mins after 11pm', () => {
    expect(() => {
      return getAverageTemperatureFromHourly(
        hourlyForBetween2300AndMidnightTesting,
        Temporal.Instant.from('2024-06-11T23:31:00+0100')
      );
    }).not.toThrow();
  });

  test('a 44 mins after 11pm', () => {
    expect(() => {
      return getAverageTemperatureFromHourly(
        hourlyForBetween2300AndMidnightTesting,
        Temporal.Instant.from('2024-06-11T23:44:00+0100')
      );
    }).not.toThrow();
  });

  test('a 45 mins after 11pm', () => {
    expect(() => {
      return getAverageTemperatureFromHourly(
        hourlyForBetween2300AndMidnightTesting,
        Temporal.Instant.from('2024-06-11T23:45:00+0100')
      );
    }).not.toThrow();
  });

  test('a 46 mins after 11pm', () => {
    expect(() => {
      return getAverageTemperatureFromHourly(
        hourlyForBetween2300AndMidnightTesting,
        Temporal.Instant.from('2024-06-11T23:46:00+0100')
      );
    }).not.toThrow();

    expect(
      getAverageTemperatureFromHourly(
        hourlyForBetween2300AndMidnightTesting,
        Temporal.Instant.from('2024-06-11T23:46:00+0100')
      )
    ).toBe(12.26);
  });
});
