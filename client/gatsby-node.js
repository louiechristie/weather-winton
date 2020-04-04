require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const axios = require('axios');

const CLOUDY_IMAGE_SRC =
  'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/7.svg';
const PROBABLY_CLOUDY = 'Probably Cloudy';
const { GATSBY_API_URL } = process.env;

exports.createPages = async ({ actions: { createPage } }) => {
  try {
    const result = await axios.get(GATSBY_API_URL);

    console.log('result: ', result);

    const items = result.data;

    createPage({
      path: `/`,
      component: require.resolve('./src/templates/WeatherContainer.js'),
      context: { items },
    });
  } catch (error) {
    console.log(error);

    const mock = [
      {
        date: 'Today',
        description: PROBABLY_CLOUDY,
        icon: CLOUDY_IMAGE_SRC,
        temperature: null,
      },
      {
        date: 'Sorry, problem getting forecast.',
        description: `${error}`,
        icon: CLOUDY_IMAGE_SRC,
        temperature: null,
      },
    ];

    createPage({
      path: `/`,
      component: require.resolve('./src/templates/WeatherContainer.js'),
      context: { items: mock },
    });
  }
};
