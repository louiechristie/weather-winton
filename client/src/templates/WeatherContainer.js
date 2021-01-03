import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import formattedDateFromISODate from '../utilities/formattedDateFromISODate';
import dayjs from 'dayjs';

import Header from '../components/Header';
import WeatherWidget from '../components/WeatherWidget';
import { getTemperatureFriendly } from '../utilities/getRoomTemperatureComfortFromCelsius';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Footer from '../components/Footer';

const styles = (theme) => ({
  container: {},
  warm: {
    color: 'black',
    backgroundColor: '#f1d220',
  },
  hot: {
    color: 'white',
    backgroundColor: '#cc0605',
  },
  cold: {
    color: 'white',
    backgroundColor: '#0075c4',
  },
  freezing: {
    color: 'white',
    backgroundColor: '#004a93',
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

const WeatherContainer = ({ classes, pageContext: { items, meta } }) => {
  const now = dayjs();

  let date = 'Today';

  if (items[0]?.time) {
    date = formattedDateFromISODate(items[0].time);
  }

  const todaysWeather = `${items[0]?.description || 'probably raining'}`;

  const getTempFriendlyClassName = (temperature) => {
    if (getTemperatureFriendly(temperature) === 'Hot 🥵') {
      return `${classes.hot} hot`;
    }
    if (getTemperatureFriendly(temperature) === 'Warm') {
      return `${classes.warm} warm`;
    }
    if (getTemperatureFriendly(temperature) === 'Cold') {
      return `${classes.cold} cold`;
    }
    if (getTemperatureFriendly(temperature) === 'Freezing 🥶') {
      return `${classes.freezing} freezing`;
    }
  };

  return (
    <div className={classes.container}>
      <Header
        title={meta.siteTitle}
        description={meta.location}
        image={(items && items[0] && items[0].icon) || meta.defaultImageSrc}
        alt={todaysWeather || meta.defaultDescription}
        temperatureClass={getTempFriendlyClassName(
          Math.round(items[0]?.avgTemperature) || 21
        )}
        meta={meta}
      />

      <WeatherWidget
        items={items.map((item) => {
          return { ...item, friendlyDate: formattedDateFromISODate(item.time) };
        })}
      />

      <div className={classes.blurb}>
        <Paper className={[classes.note, classes.cta]}>
          <Typography variant="h6" component="h6" gutterBottom align="center">
            <a href="https://www.louiechristie.com/blog/contact/">
              Want me to build you an app or website?
            </a>
          </Typography>
          <Typography variant="body1" component="p">
            10% discount on blue ones
          </Typography>
        </Paper>

        <Paper className={[classes.note, classes.about]}>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            About
          </Typography>
          <Typography variant="body1" component="p" paragraph align="left">
            {meta.siteDescription}
          </Typography>
        </Paper>

        <Paper className={[classes.note, classes.about]}>
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
    </div>
  );
};

export default withStyles(styles)(WeatherContainer);
