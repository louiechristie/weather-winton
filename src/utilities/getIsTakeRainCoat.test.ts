import getIsTakeRaincoat from './getIsTakeRainCoat';
import { DailyWeatherData } from '../../src/types/metOffice';

const day: DailyWeatherData = {
  time: '2020-05-18T00:00Z',
  midday10MWindSpeed: 5.2,
  midnight10MWindSpeed: 3.03,
  midday10MWindDirection: 242,
  midnight10MWindDirection: 258,
  midday10MWindGust: 8.23,
  midnight10MWindGust: 6.17,
  middayVisibility: 19518,
  midnightVisibility: 21802,
  middayRelativeHumidity: 34.76,
  midnightRelativeHumidity: 58.3,
  middayMslp: 102330,
  midnightMslp: 102370,
  maxUvIndex: 7,
  daySignificantWeatherCode: 3,
  nightSignificantWeatherCode: 7,
  dayMaxScreenTemperature: 22.197664,
  nightMinScreenTemperature: 12.942589,
  dayUpperBoundMaxTemp: 23.6688,
  nightUpperBoundMinTemp: 14.7560425,
  dayLowerBoundMaxTemp: 19.913637,
  nightLowerBoundMinTemp: 10.00107,
  dayMaxFeelsLikeTemp: 19.85,
  nightMinFeelsLikeTemp: 12.53,
  dayUpperBoundMaxFeelsLikeTemp: 23.315,
  nightUpperBoundMinFeelsLikeTemp: 15.491,
  dayLowerBoundMaxFeelsLikeTemp: 15.653,
  nightLowerBoundMinFeelsLikeTemp: 5.7654,
  dayProbabilityOfPrecipitation: 2,
  nightProbabilityOfPrecipitation: 5,
  dayProbabilityOfSnow: 0,
  nightProbabilityOfSnow: 3,
  dayProbabilityOfHeavySnow: 0,
  nightProbabilityOfHeavySnow: 0,
  dayProbabilityOfRain: 2,
  nightProbabilityOfRain: 5,
  dayProbabilityOfHeavyRain: 0,
  nightProbabilityOfHeavyRain: 1,
  dayProbabilityOfHail: 0,
  nightProbabilityOfHail: 0,
  dayProbabilityOfSferics: 0,
  nightProbabilityOfSferics: 0,
};

describe('take raincoat', () => {
  it('should suggest raincoat if probability of precipitation is 50% or greater during day', () => {
    const input = {
      ...day,
      dayProbabilityOfPrecipitation: 50,
    };
    expect(getIsTakeRaincoat(input)).toEqual(true);
  });

  it('should suggest raincoat if probability of precipitation is 50% or greater during night', () => {
    const input = {
      ...day,
      nightProbabilityOfPrecipitation: 50,
    };
    expect(getIsTakeRaincoat(input)).toEqual(true);
  });

  it('should not suggest raincoat if probability of precipitation is less than 50% during day and night', () => {
    const input = {
      ...day,
      dayProbabilityOfPrecipitation: 49.9,
      nightProbabilityOfPrecipitation: 49.9,
    };
    expect(getIsTakeRaincoat(input)).toEqual(false);
  });

  it("should suggest raincoat if day significant weather code is 'light rain shower' or worse", () => {
    // For significantWeatherCode definitions see: https://www.metoffice.gov.uk/services/data/datapoint/code-definitions
    const input = {
      ...day,
      daySignificantWeatherCode: 10,
    };
    expect(getIsTakeRaincoat(input)).toEqual(true);
  });

  it("should suggest raincoat if night significant weather code is 'light rain shower' or worse", () => {
    // For significantWeatherCode definitions see: https://www.metoffice.gov.uk/services/data/datapoint/code-definitions
    const input = {
      ...day,
      nightSignificantWeatherCode: 10,
    };
    expect(getIsTakeRaincoat(input)).toEqual(true);
  });

  it("should not suggest raincoat if day significant weather code is 'overcast' or better", () => {
    // For significantWeatherCode definitions see: https://www.metoffice.gov.uk/services/data/datapoint/code-definitions
    const input = {
      ...day,
      daySignificantWeatherCode: 9,
      dayProbabilityOfPrecipitation: 0,
      nightProbabilityOfPrecipitation: 0,
    };
    expect(getIsTakeRaincoat(input)).toEqual(false);
  });

  it("should not suggest raincoat if night significant weather code is 'overcast' or better", () => {
    // For significantWeatherCode definitions see: https://www.metoffice.gov.uk/services/data/datapoint/code-definitions
    const input = {
      ...day,
      nightSignificantWeatherCode: 9,
      dayProbabilityOfPrecipitation: 0,
      nightProbabilityOfPrecipitation: 0,
    };
    expect(getIsTakeRaincoat(input)).toEqual(false);
  });
});
