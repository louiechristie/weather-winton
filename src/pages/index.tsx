import Head from 'next/head';

import axios from 'axios';
import Color from 'color';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import path from 'path';
import sharp from 'sharp';

import Footer from '../components/Footer';
import Days from '../components/Days';
import Info from '../components/Info';

import manifest from '../../package.json' with { type: 'json' };
import getForecast, { getMockForecast } from '@/utilities/getForecast';
import { getTemperatureFriendly } from '@/utilities/getRoomTemperatureComfortFromCelsius.mjs';
import getSpecialDates from '@/utilities/getSpecialDates';

import Header from '@/components/Header';

import type Meta from '@/types/meta';
import type { item, items } from '@/utilities/transformMetOfficeJSON';
import { CSSProperties } from 'react';

axios.defaults.timeout = 20000;

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/London');
dayjs.extend(customParseFormat);

const styles: { [key: string]: React.CSSProperties } = {
  hot: {
    color: 'white',
    backgroundColor: '#cc0605',
    borderBottomColor: '#f1d220',
  },
  warmToHot: {
    color: 'black',
    backgroundColor: '#f1d220',
    borderBottomColor: '#cc0605',
  },
  warmToCold: {
    color: 'black',
    backgroundColor: '#f1d220',
    borderBottomColor: '#0075c4',
  },
  coldToWarm: {
    color: 'white',
    backgroundColor: '#0075c4',
    borderBottomColor: '#f1d220',
  },
  coldToFreezing: {
    color: 'white',
    backgroundColor: '#0075c4',
    borderBottomColor: '#004a93',
  },
  freezing: {
    color: 'white',
    backgroundColor: '#004a93',
    borderBottomColor: '#0075c4',
  },
} as const;

const getAppBarStyle = (forecast: item) => {
  const averageTempInt = Math.round(forecast.averageTemperature);
  const maxTempInt = Math.round(forecast.maxTemperature);

  if (getTemperatureFriendly(averageTempInt) === 'Hot 🥵') {
    return styles.hot;
  }
  if (getTemperatureFriendly(averageTempInt) === 'Warm') {
    if (getTemperatureFriendly(Math.round(maxTempInt)) === 'Hot 🥵') {
      return styles.warmToHot;
    }
    return styles.warmToCold;
  }
  if (getTemperatureFriendly(averageTempInt) === 'Cold') {
    if (getTemperatureFriendly(Math.round(maxTempInt)) === 'Warm') {
      return styles.coldToWarm;
    }
    return styles.coldToFreezing;
  }
  if (getTemperatureFriendly(averageTempInt) === 'Freezing 🥶') {
    return styles.freezing;
  }
};

interface Props {
  items: items;
  meta: Meta;
}

export default function Home(props: Props) {
  const { items, meta } = props;

  const {
    siteTitle,
    siteDescription,
    siteUrl,
    monetization,
    author: { name, url },
    version,
    timeStamp,
    todaysWeather,
    location,
    ogImage,
  } = meta;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          {todaysWeather} | {location} | {siteTitle}
        </title>
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

      <Header
        title={meta.siteTitle}
        description={meta.location}
        image={items && items[0] && items[0].icon}
        alt={todaysWeather}
        temperatureClass={getAppBarStyle(items[0]) || styles.coldToFreezing}
        meta={meta}
      />

      <main>
        <Days items={items} />

        <Info meta={meta} />

        <Footer meta={meta} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const now = dayjs();
  const nowTimeStamp = now.toISOString();

  let items;
  const specialDates = await getSpecialDates();

  const CLOUDY_IMAGE_SRC =
    'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/12.svg';
  const PROBABLY_RAINING = 'Probably Raining';

  const { title, description, author, version } = manifest;

  const meta: Meta = {
    siteTitle: title,
    siteDescription: description,
    siteUrl: process.env.GATSBY_SITE_URL,
    monetization: `$ilp.gatehub.net/484331722`,
    author,
    version,
    timeStamp: nowTimeStamp,
    todaysWeather: PROBABLY_RAINING,
    location: 'South London',
    ogImage: `og-image-${dayjs().tz().format('YYYY-MM-DD-HH:mm:ss')}.png`,
  };

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
    if (!isFinite(celsius))
      throw new Error(
        'Cannot get friendly temperature from celsius value: ${celsius}'
      );
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

  try {
    if (process.env.NODE_ENV === 'production') {
      if (!process.env.GATSBY_MET_WEATHER_DAILY_URL) {
        throw new Error(
          'You need to set your GATSBY_MET_WEATHER_DAILY_URL environment variable'
        );
      }
      if (!process.env.GATSBY_MET_WEATHER_HOURLY_URL) {
        throw new Error(
          'You need to set your GATSBY_MET_WEATHER_HOURLY_URL environment variable'
        );
      }
      if (!process.env.GATSBY_MET_WEATHER_SECRET) {
        throw new Error(
          'You need to set your GATSBY_MET_WEATHER_SECRET environment variable'
        );
      }

      items = await getForecast(specialDates);
      // log('getForecast items: ', items);
    } else {
      items = await getMockForecast(specialDates);
    }

    meta.timeStamp = `${dayjs(new Date()).tz().format('YYYY-MM-DD HHmm')}`;

    if (!items || items.length < 1) {
      throw new Error(`No items in retrieved weather forecast`);
    }

    const today = items[0];
    const backgroundColor =
      Color(getTemperatureColor(today.averageTemperature))
        .lighten(0.75)
        .hex() || '#FFFFFF';

    const input = (
      await axios({
        method: 'get',
        url: today.icon,
        responseType: 'arraybuffer',
        headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
      })
    ).data;

    // await sharp(input, { density: 450 })
    //   .flatten({ background: backgroundColor })
    //   .resize(1200, 630, {
    //     fit: 'contain',
    //     background: backgroundColor,
    //   })
    //   .png()
    //   .toFile(`public/${meta.ogImage}`);

    // await sharp(input, { density: 450 })
    //   .flatten({ background: backgroundColor })
    //   .png()
    //   .resize(48)
    //   .toFile(`public/favicon.ico`);

    // await sharp(input, { density: 450 })
    //   .flatten({ background: backgroundColor })
    //   .resize(180)
    //   .toFile(`public/apple-touch-icon.png`);

    meta.todaysWeather = `It's ${getTemperatureFriendly(
      today.averageTemperature
    ).toLowerCase()} and ${today.description.toLowerCase()}`;
  } catch (error) {
    console.error('Error creating pages');
    console.error(error);

    const errorDisplayItems = [
      {
        friendlyDate: 'Today',
        time: nowTimeStamp,
        description: PROBABLY_RAINING,
        icon: CLOUDY_IMAGE_SRC,
      },
      {
        friendlyDate: 'Sorry, problem getting forecast.',
        time: nowTimeStamp,
        description: `${error}`,
        icon: CLOUDY_IMAGE_SRC,
      },
    ];

    items = errorDisplayItems;
  }

  return {
    props: {
      items,
      meta,
    },
  };
}
