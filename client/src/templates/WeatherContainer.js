import React from 'react';
import dayjs from 'dayjs';

import SimpleAppBar from '../components/SimpleAppBar';
import WeatherWidget from '../components/WeatherWidget';
import Footer from '../components/Footer';

export default ({ pageContext: { items, meta } }) => {
  const todaysWeather = `Today: ${
    (items && items[0] && items[0].description) || 'probably raining'
  }`;
  // const date =  `${dayjs().format('D MMM YY')}`
  return (
    <>
      <SimpleAppBar
        title={`${todaysWeather}`}
        description={`${meta.title}`}
        image={(items && items[0] && items[0].icon) || meta.defaultImageSrc}
        alt={todaysWeather || meta.defaultDescription}
        url={meta.siteURL}
      />

      <WeatherWidget items={items} />

      <Footer meta={meta} />
    </>
  );
};
