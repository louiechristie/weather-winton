import hourly from '../tests/hourly.json' assert { type: 'json' };
import getIndicativeTemperatureFromHourly from './getIndicativeTemperatureFromHourly.mjs';
import generateMockHourlyMetOfficeJSON from '../tests/generateMockHourlyMetOfficeJSON.mjs';
import dayjs from 'dayjs';
import { getIsHourInTheRemainingDay } from './metOfficeWeatherUtils.mjs';

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

  expect(getIndicativeTemperatureFromHourly(testData, timeNow)).toBeCloseTo(
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
    getIndicativeTemperatureFromHourly(
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

  expect(
    getIndicativeTemperatureFromHourly(testData, dayjs().toISOString())
  ).toBe(18);
});
