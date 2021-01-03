require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const dayjs = require('dayjs');

const axios = require('axios');
const sharp = require('sharp');
const package = require('./package.json');

const CLOUDY_IMAGE_SRC =
  'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/7.svg';
const PROBABLY_CLOUDY = 'Probably Cloudy';
const { GATSBY_SITE_URL, GATSBY_API_URL } = process.env;

const { title, description, author, version } = package;

const meta = {
  siteTitle: title,
  siteDescription: description,
  siteUrl: `${GATSBY_SITE_URL}`,
  monetization: `$ilp.gatehub.net/484331722`,
  author,
  version,
  timeStamp: null,
  todaysWeather: 'probably raining',
  location: 'South London',
};

exports.createPages = async ({ actions: { createPage } }) => {
  try {
    const result = await axios.get(GATSBY_API_URL);
    // console.log('result: ', result);

    meta.timeStamp = `${dayjs(result.headers['last-modified']).format(
      'YYYY-MM-DD HHmm'
    )}`;

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

    const items = result.data;
    const today = items[0];

    const input = (
      await axios({
        url: today.icon,
        responseType: 'arraybuffer',
      })
    ).data;

    const ogImage = await sharp(input, { density: 450 })
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .resize(1200, 630, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .png()
      .toFile(`public/og-image-${dayjs().format('YYYY-MM-DD')}.png`);

    const favicon = await sharp(input, { density: 450 })
      .png()
      .resize(48)
      .toFile(`public/favicon.ico`);

    meta.todaysWeather = items[0]?.description;

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
