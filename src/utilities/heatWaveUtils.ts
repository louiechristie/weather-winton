import type { Item } from './transformMetOfficeJSON';

export function getIsHeatWaveTemperatureFromCelsius(celsius: number): boolean {
  // https://www.metoffice.gov.uk/weather/learn-about/weather/types-of-weather/temperature/heatwave
  if (celsius >= 28) {
    return true;
  }
  return false;
}

export default function getThirdDayOfHeatwaveIndex(items: Item[]): number {
  if (!Array.isArray(items)) {
    throw Error('expected array');
  }
  const daysThatHaveTwoPreviousHeatwaveDays = items.map((item, index) => {
    return getIsAtLeastThirdDayOfHeatwave(items, index);
  });

  const isTrue = (element: boolean) => element === true;

  const foundIndex = daysThatHaveTwoPreviousHeatwaveDays.findIndex(isTrue);

  return foundIndex;
}

export function getIsAtLeastThirdDayOfHeatwave(
  items: Item[],
  index: number
): boolean {
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
