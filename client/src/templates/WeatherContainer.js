import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import ErrorBoundary from 'react-error-boundary';

import meta from '../../package.json';

import SimpleAppBar from '../components/SimpleAppBar';
import WeatherWidget from '../components/WeatherWidget';
import Footer from '../components/Footer';

const CLOUDY_IMAGE_SRC =
  'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/7.svg';
const PROBABLY_CLOUDY = 'Probably Cloudy';
const { GATSBY_SITE_URL } = process.env;
const { title, description } = meta;

export default ({ pageContext: { items } }) => (
  <ErrorBoundary>
    <SimpleAppBar
      title={title}
      description={description}
      image={(items && items[0] && items[0].icon) || CLOUDY_IMAGE_SRC}
      alt={(items && items[0] && items[0].description) || PROBABLY_CLOUDY}
      url={GATSBY_SITE_URL}
    />

    <WeatherWidget items={items} />

    <Footer meta={meta} />
  </ErrorBoundary>
);
