import dayjs from 'dayjs';
import { Link } from 'gatsby';
import React, { Component } from 'react';
import { theme } from '../utilities/theme';
import { getIsTooDryFromRelativeHumidity } from '../utilities/getComfortFromRelativeHumidity';
import getIsStickyFromCelsiusAndRelativeHumidity from '../utilities/getIsStickyFromCelsiusAndRelativeHumidity';
import Day from './Day';

const heatWaveTemperature = 30;

const styles = {
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
};

const findIndexOfLast = (array, condition) => {
  return array.length - 1 - [...array].reverse().findIndex(condition);
};

const Days = (props) => {
  const { items } = props;

  return (
    <ul style={styles.ul}>
      {items.map((item, index) => {
        const {
          friendlyDate,
          time,
          icon,
          description,
          avgTemperature,
          minTemperature,
          maxTemperature,
          relativeHumidity,
          isTakeRaincoat,
          indicativeTemperature,
          isSnowDay,
        } = item;

        return (
          <div key={time}>
            <li style={styles.li}>
              <Link
                style={styles.link}
                to={`https://www.metoffice.gov.uk/weather/forecast/gcpuyudzk#?nearestTo=New%20Cross%20(Lewisham)&date=${dayjs(
                  time
                ).format('YYYY-MM-DD')}`}
              >
                <Day
                  friendlyDate={friendlyDate}
                  time={time}
                  icon={icon}
                  description={description}
                  minTemperature={minTemperature}
                  maxTemperature={maxTemperature}
                  avgTemperature={avgTemperature}
                  indicativeTemperature={
                    indicativeTemperature || avgTemperature
                  }
                  isSticky={getIsStickyFromCelsiusAndRelativeHumidity(
                    avgTemperature,
                    relativeHumidity
                  )}
                  isDry={getIsTooDryFromRelativeHumidity(relativeHumidity)}
                  isTakeRaincoat={isTakeRaincoat}
                  isSnowDay={isSnowDay}
                />
              </Link>
            </li>
            <>
              {Math.round(item.maxTemperature) >= heatWaveTemperature &&
                index ===
                  findIndexOfLast(
                    items,
                    (day) =>
                      Math.round(day.maxTemperature) >= heatWaveTemperature
                  ) && <Advert />}
            </>
          </div>
        );
      })}
    </ul>
  );
};

const Advert = (props) => {
  return (
    <li style={{ ...styles.li, ...styles.adContainer }}>
      <h6 style={styles.adText}>Advert</h6>

      <div style={styles.adLinked}>
        <blockquote class="twitter-tweet">
          <p lang="en" dir="ltr">
            Enjoy Beer, au naturel this weekend 🥵☀️
            <br />
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

        <Link
          style={{ ...styles.link, ...styles.ad }}
          to="https://twitter.com/StellaArtoisUK/status/1547990626641137666"
        />
      </div>

      <p style={styles.adText}>
        Why?: Because it's a heatwave, let's show a picture of{' '}
        <Link to="https://undergroundcomedian.wordpress.com/gonzo/">
          Nigel Thomas
        </Link>{' '}
        with his shirt off
      </p>
      <p style={styles.adText}>(Sunglasses recommended 😎)</p>
      <h6 style={styles.adText}>End of Advert</h6>
    </li>
  );
};

export default Days;
