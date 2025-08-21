import type { Item } from '../transformMetOfficeJSON';
import { getTemperatureFriendlyDirectoryName } from '../getRoomTemperatureComfortFromCelsius.mjs';
// @ts-expect-error because we are running generating images at command line with experimental Node Typescript support
import { weatherTypes } from '../../types/metOffice.ts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getKeyByValue = (object: any, value: any) => {
  return Object.keys(object).find((key) => object[key] === value);
};

export const getImageDirectoryFromWeatherItem = (todayWeatherItem: Item) => {
  const friendlyTemperatureDir = getTemperatureFriendlyDirectoryName(
    todayWeatherItem.averageTemperature
  );

  const weatherCodeDir = getKeyByValue(
    weatherTypes,
    todayWeatherItem.description
  );

  return `images/${friendlyTemperatureDir}/${weatherCodeDir}`.toLowerCase();
};

export const getImageDirectory = (
  friendlyTemperature: string,
  weatherTypeCode: string
) => {
  return `public/images/${friendlyTemperature}/${weatherTypeCode}`.toLowerCase();
};
