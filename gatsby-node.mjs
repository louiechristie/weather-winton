import axios from 'axios';
import Color from 'color';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import path from 'path';
import sharp from 'sharp';

import manifest from './package.json' assert { type: 'json' };
import getForecast from './src/utilities/getForecast.mjs';
import { getTemperatureFriendly } from './src/utilities/getRoomTemperatureComfortFromCelsius.mjs';

axios.defaults.timeout === 30000;

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/London');

const CLOUDY_IMAGE_SRC =
  'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/12.svg';
const PROBABLY_RAINING = 'Probably Raining';

const { title, description, author, version } = manifest;

const meta = {
  siteTitle: title,
  siteDescription: description,
  siteUrl: process.env.GATSBY_SITE_URL,
  monetization: `$ilp.gatehub.net/484331722`,
  author,
  version,
  timeStamp: null,
  todaysWeather: 'probably raining',
  location: 'South London',
  ogImage: `og-image-${dayjs().tz().format('YYYY-MM-DD-HH:mm:ss')}.png`,
};

function getIsTooHotForRoomTemperatureFromCelsius(celsius) {
  // the maximum should be below 24 °C (75 °F) – and to avoid sick building syndrome, below 22 °C (72 °F).[3]
  // From https://en.wikipedia.org/wiki/Room_temperature Accessed 2019-12-28
  if (celsius > 24) {
    return true;
  }
  return false;
}

function getIsTooColdForRoomTemperatureFromCelsius(celsius) {
  // The World Health Organization's standard ...
  // For those with respiratory problems or allergies, they recommend no less than 16 °C */
  // From https://en.wikipedia.org/wiki/Room_temperature Accessed 2019-12-28
  if (celsius < 16) {
    return true;
  }
  return false;
}

function getIsFrostyFromCelsius(celsius) {
  // Frost is likely below 4 degrees celsius
  // https://www.metoffice.gov.uk/weather/learn-about/weather/types-of-weather/frost-and-ice/forecasting-frost
  if (celsius <= 4) {
    return true;
  }
}

function getTemperatureColor(celsius) {
  if (!isFinite(celsius)) return null;
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

export const createPages = async ({ actions: { createPage } }) => {
  try {
    const items = await getForecast();
    // log('getForecast items: ', items);

    meta.timeStamp = `${dayjs(new Date()).tz().format('YYYY-MM-DD HHmm')}`;

    if (!items || items.length < 1) {
      throw new Error(`No items in retrieved weather forecast`);
    }

    const today = items[0];
    const backgroundColor =
      Color(getTemperatureColor(today.avgTemperature)).lighten(0.75).hex() ||
      '#FFFFFF';

    const input = (
      await axios({
        method: 'get',
        url: today.icon,
        responseType: 'arraybuffer',
        headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
      })
    ).data;

    await sharp(input, { density: 450 })
      .flatten({ background: backgroundColor })
      .resize(1200, 630, {
        fit: 'contain',
        background: backgroundColor,
      })
      .png()
      .toFile(`public/${meta.ogImage}`);

    await sharp(input, { density: 450 })
      .flatten({ background: backgroundColor })
      .png()
      .resize(48)
      .toFile(`public/favicon.ico`);

    await sharp(input, { density: 450 })
      .flatten({ background: backgroundColor })
      .resize(180)
      .toFile(`public/apple-touch-icon.png`);

    meta.todaysWeather = `It's ${getTemperatureFriendly(
      today.avgTemperature
    ).toLowerCase()} and ${today.description.toLowerCase()}`;

    createPage({
      path: `/`,
      component: path.resolve('./src/templates/WeatherContainer.mjs'),
      context: { items, meta },
    });
  } catch (error) {
    console.error('Error creating pages');
    console.error(error);

    const now = dayjs();
    const today = now.toISOString();

    const mock = [
      {
        friendlyDate: 'Today',
        time: today,
        description: PROBABLY_RAINING,
        icon: CLOUDY_IMAGE_SRC,
        temperature: null,
      },
      {
        friendlyDate: 'Sorry, problem getting forecast.',
        time: today,
        description: `${error}`,
        icon: CLOUDY_IMAGE_SRC,
        temperature: null,
      },
    ];

    createPage({
      path: `/`,
      component: path.resolve('./src/templates/WeatherContainer.mjs'),
      context: { items: mock, meta },
    });
  }
};
