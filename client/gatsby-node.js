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
  title,
  description,
  defaultDescription: PROBABLY_CLOUDY,
  defaultImageSrc: CLOUDY_IMAGE_SRC,
  siteURL: GATSBY_SITE_URL,
  author,
  version,
  timeStamp: null,
};

exports.createPages = async ({ actions: { createPage } }) => {
  try {
    const result = await axios.get(GATSBY_API_URL);

    console.log('result: ', result);

    meta.timeStamp = `${dayjs(result.headers['last-modified']).format(
      'YYYY-MM-DD hhmm'
    )}`;

    const foreCastHoursOutOfDate = dayjs(new Date()).diff(
      result.headers['last-modified'],
      'hour'
    );

    const firstDayHoursOutOfDate = dayjs(new Date()).diff(
      result.data[0].time,
      'hour'
    );

    console.log('foreCastHoursOutOfDate', foreCastHoursOutOfDate);
    console.log('firstDayHoursOutOfDate', firstDayHoursOutOfDate);

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

    createPage({
      path: `/`,
      component: require.resolve('./src/templates/WeatherContainer.js'),
      context: { items, meta },
    });
  } catch (error) {
    console.log(error);

    const mock = [
      {
        friendlyDate: 'Today',
        time: 'Sometimes',
        description: PROBABLY_CLOUDY,
        icon: CLOUDY_IMAGE_SRC,
        temperature: null,
      },
      {
        friendlyDate: 'Sorry, problem getting forecast.',
        time: '?',
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
