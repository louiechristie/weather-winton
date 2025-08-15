import sharp from 'sharp';
import axios from 'axios';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import Color from 'color';
import 'dotenv/config';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/London');
dayjs.extend(customParseFormat);

console.log('Generating images');

const ogImage = `og-image-${dayjs().tz().format('YYYY-MM-DD-HH')}.png`;

const meta = {
  ogImage,
};

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
  // if (!isFinite(celsius)) throw new Error('celsius cannot be infinte');
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
  if (!process.env.GATSBY_MET_WEATHER_SECRET) {
    throw new Error(
      'You need to set your GATSBY_MET_WEATHER_SECRET environment variable'
    );
  } else {
    const input = (
      await axios({
        method: 'get',
        url: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/1.svg',
        responseType: 'arraybuffer',
        headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
      })
    ).data;

    const getMetOfficeForecast = async () => {
      const headers: HeadersInit = {
        // prettier-ignore
        'accept': 'application/json',
        // prettier-ignore
        'apikey': process.env.GATSBY_MET_WEATHER_SECRET || "",
      };

      if (!process.env.GATSBY_MET_WEATHER_DAILY_URL) {
        throw new Error('MET_WEATHER_DAILY_URL missing');
      }
      if (!process.env.GATSBY_MET_WEATHER_HOURLY_URL) {
        throw new Error('MET_WEATHER_HOURLY_URL missing');
      }
      const response = await fetch(process.env.GATSBY_MET_WEATHER_DAILY_URL, {
        headers,
      });

      if (!response) {
        throw new Error('No response from server.');
      }

      const dailyJson = await response.json();

      const items = dailyJson.features[0].properties.timeSeries;

      items.shift();

      return items;
    };

    const items = await getMetOfficeForecast();

    if (!items || items.length < 1) {
      throw new Error(`No items in retrieved weather forecast`);
    }

    const today = items[0];
    const backgroundColor =
      Color(getTemperatureColor(today.averageTemperature))
        .lighten(0.75)
        .hex() || '#FFFFFF';

    await sharp(input, { density: 450 })
      .flatten({ background: backgroundColor })
      .resize(1200, 630, {
        fit: 'contain',
        background: backgroundColor,
      })
      .png()
      .toFile(`./public/${meta.ogImage}`);

    await sharp(input, { density: 450 })
      .flatten({ background: backgroundColor })
      .png()
      .resize(48)
      .toFile(`./public/favicon.ico`);

    await sharp(input, { density: 450 })
      .flatten({ background: backgroundColor })
      .resize(180)
      .toFile(`./public/apple-touch-icon.png`);
  }
} catch (error) {
  console.error('Error generating images: ', error);
}
