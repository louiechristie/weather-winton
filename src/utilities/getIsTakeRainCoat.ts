import { DailyWeatherData } from '../../src/types/metOffice';

const getIsTakeRaincoat = (day: DailyWeatherData) => {
  const isTakeRaincoat =
    day.dayProbabilityOfPrecipitation >= 50 ||
    day.nightProbabilityOfPrecipitation >= 50 ||
    day.daySignificantWeatherCode >= 10 ||
    day.nightSignificantWeatherCode >= 10;
  return isTakeRaincoat;
};

export default getIsTakeRaincoat;
