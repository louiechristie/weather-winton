import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import { theme } from '../utilities/theme';
import getThirdDayOfHeatwaveIndex from '../utilities/heatWaveUtils.mjs';
import Day from './Day';

import { Items } from '@/utilities/transformMetOfficeJSON';

export const styles = {
  ul: {
    margin: 0,
    padding: 0,
    paddingTop: theme.spacing(4),
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  li: {
    flex: 1,
    textIndent: 0,
    listStyle: 'none',
    margin: 0,
    padding: 0,
    marginBottom: theme.spacing(4),
    // borderWidth: 2,
    // borderStyle: 'solid',
    // borderColor: 'red',
  },
  link: { textDecoration: 'none', color: 'black' },
  adContainer: {
    maxWidth: 320,
    textAlign: 'center',
  },
  adLinked: {
    position: 'relative',
  },
  ad: {
    maxWidth: 320,
    position: 'absolute' /* Sit on top of the page content */,
    width: '100%' /* Full width (cover the whole page) */,
    height: '100%' /* Full height (cover the whole page) */,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2 /* Specify a stack order in case you're using a different order for other elements */,
    cursor: 'pointer' /* Add a pointer on hover */,
  },
  adText: {
    textAlign: 'center',
  },
} as const;

interface Props {
  items: Items;
}

const Days = (props: Props) => {
  const { items } = props;

  const thirdDayOfHeatWaveIndex = getThirdDayOfHeatwaveIndex(items);

  let days = items.map((item, index) => {
    const { time } = item;

    return (
      <li style={styles.li} key={time}>
        <Link
          style={styles.link}
          href={`https://www.metoffice.gov.uk/weather/forecast/gcpuyudzk#?nearestTo=New%20Cross%20(Lewisham)&date=${dayjs(
            time
          ).format('YYYY-MM-DD')}`}
        >
          <Day {...item} />
        </Link>
      </li>
    );
  });

  if (thirdDayOfHeatWaveIndex !== -1) {
    days = days.toSpliced(
      thirdDayOfHeatWaveIndex,
      0,
      <li
        style={{ ...styles.li, ...styles.adContainer }}
        key={'advert-heatwave'}
      >
        <Advert />
      </li>
    );
  }

  return <ul style={styles.ul}>{days}</ul>;
};

const Advert = () => {
  return (
    <>
      <h3 style={styles.adText}>Advert</h3>
      <blockquote className="twitter-tweet" data-dnt="true">
        <p lang="en" dir="ltr">
          Enjoy Beer, au naturel this weekend 🥵☀️
          <br />
          New Stella Artois Unfiltered, available in stores and online across
          the UK.{' '}
          <a href="https://twitter.com/hashtag/BeerAuNaturel?src=hash&amp;ref_src=twsrc%5Etfw">
            #BeerAuNaturel
          </a>{' '}
          <a href="https://twitter.com/hashtag/WeatherAuNaturel?src=hash&amp;ref_src=twsrc%5Etfw">
            #WeatherAuNaturel
          </a>
        </p>
        &mdash; StellaArtoisUK (@StellaArtoisUK){' '}
        <a href="https://twitter.com/StellaArtoisUK/status/1547990626641137666?ref_src=twsrc%5Etfw">
          July 15, 2022
        </a>
      </blockquote>
      <script async src="https://platform.twitter.com/widgets.js" />
      <p style={styles.adText}>
        Why this Ad?: Because it&apos;s a heatwave, let&apos;s show a picture of{' '}
        <Link href="https://undergroundcomedian.wordpress.com/gonzo/">
          Nigel Thomas
        </Link>{' '}
        with his shirt off. (Sunglasses recommended 😎)
      </p>
      <h3 style={styles.adText}>End of Advert</h3>
    </>
  );
};

export default Days;
