import { expect, describe, test, beforeAll } from '@jest/globals';

import { Item } from '../utilities/transformMetOfficeJSON';
import SpecialDate from '@/types/specialDate';

import getSpecialDates from '../utilities/getSpecialDates';
import { getMockForecast } from '../utilities/getForecast';
import getThirdDayOfHeatwaveIndex, {
  getIsHeatWaveTemperatureFromCelsius,
  getIsAtLeastThirdDayOfHeatwave,
} from './heatWaveUtils';

describe('heat wave utils', () => {
  describe('getIsHeatWaveTemperatureFromCelsius', () => {
    test('28 degrees should return true', () => {
      expect(getIsHeatWaveTemperatureFromCelsius(28)).toBe(true);
    });

    test('27.99 degrees should return false', () => {
      expect(getIsHeatWaveTemperatureFromCelsius(27.99)).toBe(false);
    });

    test('0 degrees should return false', () => {
      expect(getIsHeatWaveTemperatureFromCelsius(0)).toBe(false);
    });
  });

  describe('getIsAtLeastThirdDayOfHeatwave', () => {
    let specialDates: SpecialDate[];
    let cloneableMockForecast: Item[];

    beforeAll(async () => {
      specialDates = await getSpecialDates();
      cloneableMockForecast = await getMockForecast(specialDates);
    });

    describe('two days over 28 degrees', () => {
      let testMockItems: Item[];

      beforeAll(async () => {
        testMockItems = [...cloneableMockForecast];
        testMockItems[0].maxTemperature = 28;
        testMockItems[1].maxTemperature = 28;
      });

      test('two days over 28 degrees returns false', () => {
        expect(getIsAtLeastThirdDayOfHeatwave(testMockItems, 0)).toBe(false);
        expect(getIsAtLeastThirdDayOfHeatwave(testMockItems, 1)).toBe(false);
        expect(getIsAtLeastThirdDayOfHeatwave(testMockItems, 2)).toBe(false);
      });

      test('getThirdDayOfHeatwaveIndex returns -1', () => {
        expect(getThirdDayOfHeatwaveIndex(testMockItems)).toBe(-1);
      });
    });

    describe('three days over 28 degrees', () => {
      let testMockItems: Item[];

      beforeAll(async () => {
        testMockItems = [...cloneableMockForecast];
        testMockItems[0].maxTemperature = 28;
        testMockItems[1].maxTemperature = 28;
        testMockItems[2].maxTemperature = 28;
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

    describe('four days over 28 degrees', () => {
      let testMockItems: Item[];

      beforeAll(async () => {
        testMockItems = [...cloneableMockForecast];
        testMockItems[0].maxTemperature = 28;
        testMockItems[1].maxTemperature = 28;
        testMockItems[2].maxTemperature = 28;
        testMockItems[4].maxTemperature = 28;
      });

      test('getIsAtLeastThirdDayOfHeatwave returns true/false', () => {
        expect(getIsAtLeastThirdDayOfHeatwave(testMockItems, 0)).toBe(false);
        expect(getIsAtLeastThirdDayOfHeatwave(testMockItems, 1)).toBe(false);
        expect(getIsAtLeastThirdDayOfHeatwave(testMockItems, 2)).toBe(true);
        expect(getIsAtLeastThirdDayOfHeatwave(testMockItems, 2)).toBe(true);
      });

      test('three days over 28 degrees returns 2', () => {
        expect(getThirdDayOfHeatwaveIndex(testMockItems)).toBe(2);
      });
    });

    describe('heat wave in the future', () => {
      let testMockItems: Item[];

      beforeAll(async () => {
        testMockItems = [...cloneableMockForecast];

        testMockItems[0].maxTemperature = 27;
        testMockItems[1].maxTemperature = 28;
        testMockItems[2].maxTemperature = 28;
        testMockItems[3].maxTemperature = 28;
      });

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
  });
});
