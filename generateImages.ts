import sharp from 'sharp';
import axios from 'axios';
import { mkdir } from 'fs/promises';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import Color from 'color';
import 'dotenv/config';
// @ts-expect-error because we are running this at command line with experimental Node Typescript support
import { weatherTypes } from './src/types/metOffice.ts';
// @ts-expect-error because we are running this at command line with experimental Node Typescript support
import { getImageDirectory } from './src/utilities/file/getImageDirectory.ts';
// @ts-expect-error because we are running this at command line with experimental Node Typescript support
import { friendlyTemperatures } from './src/types/weatherItems.ts';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/London');
dayjs.extend(customParseFormat);

console.log('Generating images');

function getIsTooHotForRoomTemperatureFromCelsius(celsius: number) {
  // the maximum should be below 24 °C (75 °F) – and to avoid sick building syndrome, below 22 °C (72 °F).[3]
  // From https://en.wikipedia.org/wiki/Room_temperature Accessed 2019-12-28
  if (celsius > 24) {
    return true;
  }
  return false;
}

function getIsTooColdForRoomTemperatureFromCelsius(celsius: number) {
  // The World Health Organization's standard ...
  // For those with respiratory problems or allergies, they recommend no less than 16 °C */
  // From https://en.wikipedia.org/wiki/Room_temperature Accessed 2019-12-28
  if (celsius < 16) {
    return true;
  }
  return false;
}

function getIsFrostyFromCelsius(celsius: number) {
  // Frost is likely below 4 degrees celsius
  // https://www.metoffice.gov.uk/weather/learn-about/weather/types-of-weather/frost-and-ice/forecasting-frost
  if (celsius <= 4) {
    return true;
  }
}

function getTemperatureColor(celsius: number) {
  // if (!isFinite(celsius)) throw new Error('celsius cannot be infinite');
  if (getIsTooHotForRoomTemperatureFromCelsius(celsius)) {
    return '#cc0605';
  }
  if (getIsFrostyFromCelsius(celsius)) {
    return '#004a93';
  }
  if (getIsTooColdForRoomTemperatureFromCelsius(celsius)) {
    return '#0075c4';
  }
  return '#f1d220';
}

try {
  // Generate images for each combination of temperature and weather code
  for (const temperature of Object.keys(
    friendlyTemperatures
  ) as (keyof typeof friendlyTemperatures)[]) {
    for (const weatherTypeCode of Object.keys(weatherTypes).filter(
      (key) => typeof key === 'string'
    )) {
      const directory = getImageDirectory(temperature, weatherTypeCode);

      console.log('Creating images in directory: ', directory);

      const temperatureColor = getTemperatureColor(
        friendlyTemperatures[temperature]
      );

      const backgroundColor =
        Color(temperatureColor).lighten(0.75).hex() || '#FFFFFF';

      // Create directories if they don't exist
      await mkdir(directory, { recursive: true });

      const input = (
        await axios({
          method: 'get',
          url: `https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/${weatherTypeCode}.svg`,
          responseType: 'arraybuffer',
          headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
        })
      ).data;

      // Generate OG image for this combination
      await sharp(input, { density: 450 })
        .flatten({ background: backgroundColor })
        .resize(1200, 630, {
          fit: 'contain',
          background: backgroundColor,
        })
        .png()
        .toFile(`${directory}/og-image.png`);

      // Generate favicon for this combination
      await sharp(input, { density: 450 })
        .flatten({ background: backgroundColor })
        .png()
        .resize(48)
        .toFile(`${directory}/favicon.ico`);

      // Generate apple touch icon for this combination
      await sharp(input, { density: 450 })
        .flatten({ background: backgroundColor })
        .resize(180)
        .toFile(`${directory}/apple-touch-icon.png`);
    }
  }
} catch (error) {
  console.error('Error generating images: ', error);
}
