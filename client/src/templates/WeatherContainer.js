import React from 'react';
import formattedDateFromISODate from '../utilities/formattedDateFromISODate';
import dayjs from 'dayjs';

import Header from '../components/Header';
import WeatherWidget from '../components/WeatherWidget';
import Footer from '../components/Footer';

export default ({ pageContext: { items, meta } }) => {
  const now = dayjs();

  let date = 'Today';

  // if (items && items[0] && items[0].time) {
  //   date = `${dayjs(items[0].time).format('D MMM')}`;
  // }

  const todaysWeather = `${date}: ${
    (items && items[0] && items[0].description) || 'probably raining'
  }`;

  return (
    <>
      <Header
        title={`${todaysWeather}`}
        description={`${meta.title}`}
        image={(items && items[0] && items[0].icon) || meta.defaultImageSrc}
        alt={todaysWeather || meta.defaultDescription}
        url={meta.siteURL}
      />

      <WeatherWidget
        items={items.map((item) => {
          return { ...item, friendlyDate: formattedDateFromISODate(item.time) };
        })}
      />

      <Footer meta={meta} />
    </>
  );
};
