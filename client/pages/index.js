import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import formattedDateFromISODate from '/src/utilities/formattedDateFromISODate';
import dayjs from 'dayjs';
import axios from 'axios';
// import sharp from 'sharp';
// const fs = require('fs');

import Header from '/src/components/Header';
import WeatherWidget from '/src/components/WeatherWidget';
import { getTemperatureFriendly } from '/src/utilities/getRoomTemperatureComfortFromCelsius';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Footer from '/src/components/Footer';

const mainifest = require('/package.json');

const CLOUDY_IMAGE_SRC =
  'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/7.svg';
const PROBABLY_CLOUDY = 'Probably Cloudy';
const { SITE_URL, API_URL } = process.env;

const { title, description, author, version } = mainifest;

const meta = {
  siteTitle: title,
  siteDescription: description,
  siteUrl: `${SITE_URL}`,
  monetization: `$ilp.gatehub.net/484331722`,
  author,
  version,
  timeStamp: null,
  todaysWeather: 'probably raining',
  location: 'South London',
};

function getIsTooHotForRoomTemperatureFromCelsius(celsius) {
  // the maximum should be below 24 °C (75 °F) – and to avoid sick building syndrome, below 22 °C (72 °F).[3]
  // From https://en.wikipedia.org/wiki/Room_temperature Accessed 2019-12-28
  if (celsius > 24) {
    return true;
  }
  return false;
}

function getIsTooColdForRoomTemperatureFromCelsius(celsius) {
  // The World Health Organization's standard ...
  // For those with respiratory problems or allergies, they recommend no less than 16 °C */
  // From https://en.wikipedia.org/wiki/Room_temperature Accessed 2019-12-28
  if (celsius < 16) {
    return true;
  }
  return false;
}

function getIsFrostyFromCelsius(celsius) {
  // Frost is likely below 4 degrees celsius
  // https://www.metoffice.gov.uk/weather/learn-about/weather/types-of-weather/frost-and-ice/forecasting-frost
  if (celsius <= 4) {
    return true;
  }
}

function getIsComfortableRoomTemperatureFromCelsius(celsius) {
  // The World Health Organization's standard ...
  // For those with respiratory problems or allergies, they recommend no less than 16 °C */
  // From https://en.wikipedia.org/wiki/Room_temperature Accessed 2019-12-28
  if (
    !getIsTooHotForRoomTemperatureFromCelsius &&
    getIsTooColdForRoomTemperatureFromCelsius
  ) {
    return true;
  }
  return false;
}

function getTemperatureColor(celsius) {
  if (!isFinite(celsius)) return null;
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

export async function getStaticProps({ params }) {
  try {
    const result = await axios.get(API_URL);
    // console.log('result: ', result);

    meta.timeStamp = `${dayjs(result.headers['last-modified']).format(
      'YYYY-MM-DD HHmm'
    )}`;

    const foreCastHoursOutOfDate = dayjs(new Date()).diff(
      result.headers['last-modified'],
      'hour'
    );

    const firstDayHoursOutOfDate = dayjs(new Date()).diff(
      result.data[0].time,
      'hour'
    );

    console.log(
      `data fetched last-modified: ${result.headers['last-modified']}`
    );
    console.log('foreCastHoursOutOfDate', foreCastHoursOutOfDate);
    // console.log('firstDayHoursOutOfDate', firstDayHoursOutOfDate);

    if (
      foreCastHoursOutOfDate >= 12 ||
      firstDayHoursOutOfDate >= 24 ||
      firstDayHoursOutOfDate <= -24
    ) {
      throw new Error(
        `Forecast out of date by ${foreCastHoursOutOfDate} hours. First day of forecast out of date by ${firstDayHoursOutOfDate}`
      );
    }

    const items = result.data || {};
    const today = items[0];
    const backgroundColor =
      getTemperatureColor(today.avgTemperature) || '#000000';

    // const input = (
    //   await axios({
    //     url: today.icon,
    //     responseType: 'arraybuffer',
    //   })
    // ).data;

    // const ogImage = await sharp(input, { density: 450 })
    //   .flatten({ background: backgroundColor })
    //   .resize(1200, 630, {
    //     fit: 'contain',
    //     background: backgroundColor,
    //   })
    //   .png()
    //   .toBuffer();

    // fs.writeFileSync(
    //   `/public/og-image-${dayjs().format('YYYY-MM-DD')}.png`,
    //   ogImage
    // );

    // const favicon = await sharp(input, { density: 450 })
    //   .flatten({ background: backgroundColor })
    //   .png()
    //   .resize(48)
    //   .toFile(`/public/favicon.ico`);

    // const appleTouchIcon = await sharp(input, { density: 450 })
    //   .flatten({ background: backgroundColor })
    //   .resize(150)
    //   .toBuffer();

    // fs.writeFileSync(`/public/apple-touch-icon.png`, appleTouchIcon);

    meta.todaysWeather = items[0]?.description;

    return {
      props: { items, meta },
    };
  } catch (error) {
    console.error(error);

    const now = dayjs();
    const today = now.toISOString();

    const items = [
      {
        friendlyDate: 'Today',
        time: today,
        description: PROBABLY_CLOUDY,
        icon: CLOUDY_IMAGE_SRC,
        temperature: null,
      },
      {
        friendlyDate: 'Sorry, problem getting forecast.',
        time: today,
        description: `${error}`,
        icon: CLOUDY_IMAGE_SRC,
        temperature: null,
      },
    ];

    return {
      props: { items, meta },
    };
  }
}

const WeatherContainer = (props) => {
  console.log(`props: ${JSON.stringify(props, null, 2)}`);

  const { items, meta, classes } = props;

  const now = dayjs();

  let date = 'Today';

  if (items[0]?.time) {
    date = formattedDateFromISODate(items[0].time);
  }

  const todaysWeather = `${items[0]?.description || 'probably raining'}`;

  const getTempFriendlyClassName = (forecast) => {
    console.log('forecast: ', forecast);
    const avgTempInt = Math.round(forecast.avgTemperature);
    const maxTempInt = Math.round(forecast.maxTemperature);

    if (getTemperatureFriendly(avgTempInt) === 'Hot 🥵') {
      return `${classes.hot} hot`;
    }
    if (getTemperatureFriendly(avgTempInt) === 'Warm') {
      if (getTemperatureFriendly(Math.round(maxTempInt)) === 'Hot 🥵') {
        return `${classes.warmToHot} warmToHot`;
      }
      return `${classes.warmToCold} warmToCold`;
    }
    if (getTemperatureFriendly(avgTempInt) === 'Cold') {
      if (getTemperatureFriendly(Math.round(maxTempInt)) === 'Warm') {
        return `${classes.coldToWarm} coldToWarm`;
      }
      return `${classes.coldToFreezing} coldToFreezing`;
    }
    if (getTemperatureFriendly(avgTempInt) === 'Freezing 🥶') {
      return `${classes.freezing} freezing`;
    }
  };

  return (
    <Paper className="container">
      <Header
        title={meta.siteTitle}
        description={meta.location}
        image={(items && items[0] && items[0].icon) || meta.defaultImageSrc}
        alt={todaysWeather || meta.defaultDescription}
        temperatureClass={getTempFriendlyClassName(items[0])}
        meta={meta}
      />
      <WeatherWidget
        items={items.map((item) => {
          return { ...item, friendlyDate: formattedDateFromISODate(item.time) };
        })}
      />
      <div className={classes.blurb}>
        <Paper className={[classes.note, classes.cta].join(' ')}>
          <Typography variant="h6" component="h6" gutterBottom align="center">
            <a href="https://www.louiechristie.com/blog/contact/">
              Want me to build you an app or website?
            </a>
          </Typography>
          <Typography variant="body1" component="p">
            10% discount on blue ones
          </Typography>
        </Paper>

        <Paper className={[classes.note, classes.about].join(' ')}>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            About
          </Typography>
          <Typography variant="body1" component="p" paragraph align="center">
            {meta.siteDescription}
          </Typography>
        </Paper>

        <Paper className={[classes.note, classes.about].join(' ')}>
          <Typography variant="body1" component="p" paragraph align="left">
            <blockquote className={classes.quote}>
              <q>
                Instead of broadcasting the weatherman... use local computing
                intelligence to transform them into a voice report, a printed
                map, or an animated cartoon with your favorite Disney
                character... whatever way you want
              </q>
              <div className={classes.inspiration}>
                - Inspiration from{' '}
                <cite>
                  Nicholas Negropronte (1995). Being digital. New York: Knopf.
                  p.55
                  <sup>
                    <a href="https://twitter.com/louiechristie/status/1344077058570412034">
                      †
                    </a>
                  </sup>
                </cite>
              </div>
            </blockquote>
          </Typography>
        </Paper>
      </div>
      <Footer meta={meta} />
    </Paper>
  );
};

const styles = (theme) => ({
  container: {},
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
  blurb: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: theme.spacing(2),
  },
  note: {
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 5,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    maxWidth: 250,
  },
  cta: {
    maxWidth: 600,
  },
  quote: {
    margin: 0,
    marginLeft: 10,
    padding: 0,
  },
  inspiration: {
    display: 'block',
    textAlign: 'right',
  },
});

export default withStyles(styles)(WeatherContainer);