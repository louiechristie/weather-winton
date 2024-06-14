import hourly from '../tests/hourly.json' assert { type: 'json' };
import hourlyForBetween2300AndMidnightTesting from '../tests/hourlyForBetween2300AndMidnightTesting.json' assert { type: 'json' };
import getAverageTemperatureFromHourly from './getAverageTemperatureFromHourly.mjs';
import generateMockHourlyMetOfficeJSON from '../tests/generateMockHourlyMetOfficeJSON.mjs';
import dayjs from 'dayjs';
import { getIsHourInTheRemainingDay } from './getIsHourInTheRemainingDay.mjs';

const average = (array) => array.reduce((a, b) => a + b) / array.length;

test('test default generateMockHourlyMetOfficeJSON from hourly file', () => {
  const testData = structuredClone(hourly);

  // const temperatures = testData.features[0].properties.timeSeries.map(
  //   (hour) => hour.screenTemperature
  // );
  // console.log('temperatures', temperatures);

  const timeNow = '2024-06-08T07:19:00+0100';

  const expectedTemperatures = [
    11.35, 12.4, 13.49, 13.95, 14.7, 15.86, 16.16, 15.72, 16.25, 17.2, 17.67,
    17.95, 17.76, 16.84, 15.64, 14.69, 13.78,
  ];

  const expectedAverageTemperature = average(expectedTemperatures);

  expect(getAverageTemperatureFromHourly(testData, timeNow)).toBeCloseTo(
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

  expect(
    getAverageTemperatureFromHourly(
      testData,
      testData.features[0].properties.timeSeries[0].time
    )
  ).toBe(21);
});

test('test all after now are 18 degrees', () => {
  const testData = generateMockHourlyMetOfficeJSON(dayjs().toISOString());

  testData.features[0].properties.timeSeries =
    testData.features[0].properties.timeSeries.map((hour) => {
      if (getIsHourInTheRemainingDay(hour.time))
        return {
          ...hour,
          screenTemperature: 18,
        };
      else return hour;
    });

  expect(getAverageTemperatureFromHourly(testData, dayjs().toISOString())).toBe(
    18
  );
});

test('test all after now are 18 degrees', () => {
  const testData = generateMockHourlyMetOfficeJSON(dayjs().toISOString());

  testData.features[0].properties.timeSeries =
    testData.features[0].properties.timeSeries.map((hour) => {
      if (getIsHourInTheRemainingDay(hour.time))
        return {
          ...hour,
          screenTemperature: 18,
        };
      else return hour;
    });

  expect(getAverageTemperatureFromHourly(testData, dayjs().toISOString())).toBe(
    18
  );
});

test('a few mins after 11pm', () => {
  expect(() => {
    return getAverageTemperatureFromHourly(
      hourlyForBetween2300AndMidnightTesting,
      '2024-06-11T23:06:00+0100'
    );
  }).not.toThrow();

  expect(
    getAverageTemperatureFromHourly(
      hourlyForBetween2300AndMidnightTesting,
      '2024-06-11T23:06:00+0100'
    )
  ).toBe(12.26);
});

test('one second after 11pm', () => {
  expect(() => {
    return getAverageTemperatureFromHourly(
      hourlyForBetween2300AndMidnightTesting,
      '2024-06-11T23:00:01+0100'
    );
  }).not.toThrow();

  expect(
    getAverageTemperatureFromHourly(
      hourlyForBetween2300AndMidnightTesting,
      '2024-06-11T23:00:01+0100'
    )
  ).toBe(12.26);
});

test('one second till midnight', () => {
  expect(() => {
    return getAverageTemperatureFromHourly(
      hourlyForBetween2300AndMidnightTesting,
      '2024-06-11T23:59:59+0100'
    );
  }).not.toThrow();
});

test('midnight', () => {
  expect(() => {
    return getAverageTemperatureFromHourly(
      hourlyForBetween2300AndMidnightTesting,
      '2024-06-12T00:00:00+0100'
    );
  }).not.toThrow();
});

test('one second after midnight', () => {
  expect(() => {
    return getAverageTemperatureFromHourly(
      hourlyForBetween2300AndMidnightTesting,
      '2024-06-12T00:00:01+0100'
    );
  }).not.toThrow();
});

test('one minute after 11pm', () => {
  expect(() => {
    return getAverageTemperatureFromHourly(
      hourlyForBetween2300AndMidnightTesting,
      '2024-06-11T23:01:00+0100'
    );
  }).not.toThrow();
});

test('one minute till midnight', () => {
  expect(() => {
    return getAverageTemperatureFromHourly(
      hourlyForBetween2300AndMidnightTesting,
      '2024-06-11T23:59:00+0100'
    );
  }).not.toThrow();
});

test('one minute after midnight', () => {
  expect(() => {
    return getAverageTemperatureFromHourly(
      hourlyForBetween2300AndMidnightTesting,
      '2024-06-12T00:01:00+0100'
    );
  }).not.toThrow();
});

test('a 15 mins after 11pm', () => {
  expect(() => {
    return getAverageTemperatureFromHourly(
      hourlyForBetween2300AndMidnightTesting,
      '2024-06-11T23:15:00+0100'
    );
  }).not.toThrow();
});

test('a 29 mins after 11pm', () => {
  expect(() => {
    return getAverageTemperatureFromHourly(
      hourlyForBetween2300AndMidnightTesting,
      '2024-06-11T23:29:00+0100'
    );
  }).not.toThrow();
});

test('a 30 mins after 11pm', () => {
  expect(() => {
    return getAverageTemperatureFromHourly(
      hourlyForBetween2300AndMidnightTesting,
      '2024-06-11T23:30:00+0100'
    );
  }).not.toThrow();
});

test('a 31 mins after 11pm', () => {
  expect(() => {
    return getAverageTemperatureFromHourly(
      hourlyForBetween2300AndMidnightTesting,
      '2024-06-11T23:31:00+0100'
    );
  }).not.toThrow();
});

test('a 44 mins after 11pm', () => {
  expect(() => {
    return getAverageTemperatureFromHourly(
      hourlyForBetween2300AndMidnightTesting,
      '2024-06-11T23:44:00+0100'
    );
  }).not.toThrow();
});

test('a 45 mins after 11pm', () => {
  expect(() => {
    return getAverageTemperatureFromHourly(
      hourlyForBetween2300AndMidnightTesting,
      '2024-06-11T23:45:00+0100'
    );
  }).not.toThrow();
});

test('a 46 mins after 11pm', () => {
  expect(() => {
    return getAverageTemperatureFromHourly(
      hourlyForBetween2300AndMidnightTesting,
      '2024-06-11T23:46:00+0100'
    );
  }).not.toThrow();

  expect(
    getAverageTemperatureFromHourly(
      hourlyForBetween2300AndMidnightTesting,
      '2024-06-11T23:46:00+0100'
    )
  ).toBe(12.26);
});
