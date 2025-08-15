import Head from 'next/head';
import React from 'react';
import { getTemperatureFriendly } from '@/utilities/getRoomTemperatureComfortFromCelsius.mjs';
import Meta from '@/types/meta';
import type { Items } from '@/utilities/transformMetOfficeJSON';
import { ErrorItems } from '@/error/getErrorItems';
import { isItem } from '@/utilities/transformMetOfficeJSON';

interface Props {
  meta: Meta;
  items: Items | ErrorItems;
}

const CustomHead = (props: Props) => {
  const { meta, items } = props;

  const {
    siteTitle,
    siteDescription,
    siteUrl,
    monetization,
    // author: { name, url },
    // version,
    // timeStamp,
    todaysWeather,
    location,
    // ogImage,
  } = meta;

  const generatedTitle = `${todaysWeather} | ${location} | ${siteTitle}`;

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
    if (!isFinite(celsius)) {
      throw new Error(
        `Cannot get friendly temperature from Infinite celsius value`
      );
    }
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

  const today = items[0];
  // @TODO generate favicon and opengraph images

  if (isItem(today)) {
    meta.todaysWeather = today.averageTemperature
      ? `It's ${getTemperatureFriendly(
          today.averageTemperature
        ).toLowerCase()} and ${today.description.toLowerCase()}`
      : today.description;
  }

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{generatedTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta
        property="og:title"
        content={`${todaysWeather} in ${location} | ${siteTitle}`}
      />
      <meta property="og:description" content={siteDescription} />
      <meta name="apple-mobile-web-app-title" content={siteTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${siteUrl}/`} />
      <meta name="twitter:card" content="summary" />
      <meta name="monetization" content={monetization} />
    </Head>
  );
};

export default CustomHead;
