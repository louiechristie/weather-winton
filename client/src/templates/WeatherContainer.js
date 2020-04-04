import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import ErrorBoundary from 'react-error-boundary';

import SimpleAppBar from '../components/SimpleAppBar';
import WeatherWidget from '../components/WeatherWidget';
import Footer from '../components/Footer';

export default ({ pageContext: { items, meta } }) => (
  <ErrorBoundary>
    <SimpleAppBar
      title={meta.title}
      description={meta.description}
      image={(items && items[0] && items[0].icon) || meta.defaultImageSrc}
      alt={
        (items && items[0] && items[0].description) || meta.defaultDescription
      }
      url={meta.siteURL}
      png={meta.png}
    />

    <WeatherWidget items={items} />

    <Footer meta={meta} />
  </ErrorBoundary>
);
