require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
const axios = require('axios');
const Color = require('color');
const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');
const sharp = require('sharp');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/London');

const manifest = require('./package.json');

const CLOUDY_IMAGE_SRC =
  'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/7.svg';
const PROBABLY_CLOUDY = 'Probably Cloudy';

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

function getIsComfortableRoomTemperatureFromCelsius(celsius) {
  // The World Health Organization's standard ...
  // For those with respiratory problems or allergies, they recommend no less than 16 °C */
  // From https://en.wikipedia.org/wiki/Room_temperature Accessed 2019-12-28
  if (
    !getIsTooHotForRoomTemperatureFromCelsius &&
    getIsTooColdForRoomTemperatureFromCelsius
  ) {
    return true;
  }
  return false;
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

exports.createPages = async ({ actions: { createPage } }) => {
  try {
    const result = await axios.get(process.env.GATSBY_API_URL);
    console.log('result: ', result);

    meta.timeStamp = `${dayjs(result.headers['last-modified'])
      .tz()
      .format('YYYY-MM-DD HHmm')}`;

    const foreCastHoursOutOfDate = dayjs(new Date()).diff(
      result.headers['last-modified'],
      'hour'
    );

    const firstDayHoursOutOfDate = dayjs(new Date()).diff(
      result.data[0].time,
      'hour'
    );

    console.log(
      `data fetched last-modified: ${result.headers['last-modified']}`
    );
    console.log('foreCastHoursOutOfDate', foreCastHoursOutOfDate);
    // console.log('firstDayHoursOutOfDate', firstDayHoursOutOfDate);

    if (
      foreCastHoursOutOfDate >= 12 ||
      firstDayHoursOutOfDate >= 24 ||
      firstDayHoursOutOfDate <= -24
    ) {
      throw new Error(
        `Forecast out of date by ${foreCastHoursOutOfDate} hours. First day of forecast out of date by ${firstDayHoursOutOfDate}`
      );
    }

    const items = result.data || [];
    const today = items[0];
    const backgroundColor =
      Color(getTemperatureColor(today.avgTemperature)).lighten(0.75).hex() ||
      '#FFFFFF';

    const input = (
      await axios({
        url: today.icon,
        responseType: 'arraybuffer',
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

    meta.todaysWeather = `It's ${today.description.toLowerCase()}`;

    createPage({
      path: `/`,
      component: require.resolve('./src/templates/WeatherContainer.js'),
      context: { items, meta },
    });
  } catch (error) {
    console.error(error);

    const now = dayjs();
    const today = now.toISOString();

    const mock = [
      {
        friendlyDate: 'Today',
        time: today,
        description: PROBABLY_CLOUDY,
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
      component: require.resolve('./src/templates/WeatherContainer.js'),
      context: { items: mock, meta },
    });
  }
};
