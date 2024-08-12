import getThirdDayOfHeatwaveIndex, {
  getIsHeatWaveTemperatureFromCelsius,
  getIsAtLeastThirdDayOfHeatwave,
} from './heatWaveUtils.mjs';
import getMockItems from '../tests/mockItems.mjs';

const invalidValues = [undefined, null, 0, '', [], {}];

test('28 degrees should return true', () => {
  expect(getIsHeatWaveTemperatureFromCelsius(28)).toBe(true);
});

test('27.99 degrees should return false', () => {
  expect(getIsHeatWaveTemperatureFromCelsius(27.99)).toBe(false);
});

test('0 degrees should return false', () => {
  expect(getIsHeatWaveTemperatureFromCelsius(0)).toBe(false);
});

invalidValues.forEach((invalidValue) => {
  test(invalidValue + ' should return false', () => {
    expect(getIsHeatWaveTemperatureFromCelsius(invalidValue)).toBe(false);
  });
});

describe('three days over 28 degrees', () => {
  const testMockItems = getMockItems().map((day) => {
    return {
      ...day,
      maxTemperature: 28,
    };
  });

  test('getIsAtLeastThirdDayOfHeatwave returns true/false', () => {
    expect(getIsAtLeastThirdDayOfHeatwave(testMockItems, 0)).toBe(false);
    expect(getIsAtLeastThirdDayOfHeatwave(testMockItems, 1)).toBe(false);
    expect(getIsAtLeastThirdDayOfHeatwave(testMockItems, 2)).toBe(true);
  });

  test('three days over 28 degrees returns 2', () => {
    expect(getThirdDayOfHeatwaveIndex(testMockItems)).toBe(2);
  });
});

describe('two days over 28 degrees', () => {
  const testMockItems = getMockItems();

  testMockItems[0].maxTemperature = 28;
  testMockItems[1].maxTemperature = 28;

  test('two days over 28 degrees returns false', () => {
    expect(getIsAtLeastThirdDayOfHeatwave(testMockItems, 0)).toBe(false);
    expect(getIsAtLeastThirdDayOfHeatwave(testMockItems, 1)).toBe(false);
    expect(getIsAtLeastThirdDayOfHeatwave(testMockItems, 2)).toBe(false);
  });

  test.only('getThirdDayOfHeatwaveIndex returns -1', () => {
    expect(getThirdDayOfHeatwaveIndex(testMockItems)).toBe(-1);
  });
});

describe('tomorrow and next day over 28 degrees', () => {
  const testMockItems = getMockItems();
  testMockItems[0].maxTemperature = 27.99;
  testMockItems[1].maxTemperature = 28;
  testMockItems[2].maxTemperature = 28;
  testMockItems[3].maxTemperature = 28;

  test('getIsAtLeastThirdDayOfHeatwave returns correct values', () => {
    expect(getIsAtLeastThirdDayOfHeatwave(testMockItems, 0)).toBe(false);
    expect(getIsAtLeastThirdDayOfHeatwave(testMockItems, 1)).toBe(false);
    expect(getIsAtLeastThirdDayOfHeatwave(testMockItems, 2)).toBe(false);
    expect(getIsAtLeastThirdDayOfHeatwave(testMockItems, 3)).toBe(true);
  });

  test('getThirdDayOfHeatwaveIndex returns 3', () => {
    expect(getThirdDayOfHeatwaveIndex(testMockItems)).toBe(3);
  });
});
