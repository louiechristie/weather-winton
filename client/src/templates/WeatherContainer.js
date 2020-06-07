import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import ErrorBoundary from 'react-error-boundary';

import SimpleAppBar from '../components/SimpleAppBar';
import WeatherWidget from '../components/WeatherWidget';
import Footer from '../components/Footer';

export default ({ pageContext: { items, meta } }) => {
  const todaysWeather =
    (items && items[0] && items[0].description) || 'probably raining';

  return (
    <ErrorBoundary>
      <SimpleAppBar
        title={`${todaysWeather}`}
        description={`${meta.title}`}
        image={(items && items[0] && items[0].icon) || meta.defaultImageSrc}
        alt={todaysWeather || meta.defaultDescription}
        url={meta.siteURL}
      />

      <WeatherWidget items={items} />

      <Footer meta={meta} />
    </ErrorBoundary>
  );
};
