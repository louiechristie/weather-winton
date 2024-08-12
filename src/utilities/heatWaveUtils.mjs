export function getIsHeatWaveTemperatureFromCelsius(celsius) {
  // https://www.metoffice.gov.uk/weather/learn-about/weather/types-of-weather/temperature/heatwave
  if (celsius >= 28) {
    return true;
  }
  return false;
}

export default function getThirdDayOfHeatwaveIndex(items) {
  if (!Array.isArray(items)) {
    throw Error('expected array');
  }
  const daysThatHaveTwoPreviousHeatwaveDays = items.map((item, index) => {
    return getIsAtLeastThirdDayOfHeatwave(items, index);
  });

  const isTrue = (element) => element === true;

  const foundIndex = daysThatHaveTwoPreviousHeatwaveDays.findIndex(isTrue);

  return foundIndex;
}

export function getIsAtLeastThirdDayOfHeatwave(items, index) {
  if (
    index >= 2 &&
    getIsHeatWaveTemperatureFromCelsius(items[index].maxTemperature) &&
    getIsHeatWaveTemperatureFromCelsius(items[index - 1].maxTemperature) &&
    getIsHeatWaveTemperatureFromCelsius(items[index - 2].maxTemperature)
  ) {
    return true;
  }

  return false;
}
