import dayjs from 'dayjs';
import React from 'react';
import { theme, Paper, Typography } from '../utilities/theme.mjs';
import Footer from '../components/Footer.mjs';
import Header from '../components/Header.mjs';
import Days from '../components/Days.mjs';
import getFriendlyDateFromISODate from '../utilities/getFriendlyDateFromISODate.mjs';
import { getTemperatureFriendly } from '../utilities/getRoomTemperatureComfortFromCelsius.mjs';
import log from '../utilities/log.mjs';

const style = {
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
    borderRadius: 20,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    width: '300px',
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
    marginTop: 14,
    fontStyle: 'normal',
    fontSize: '1em',
  },
};

const WeatherContainer = ({ pageContext: { items, meta } }) => {
  const now = dayjs();

  let date = 'Today';

  if (items[0]?.time) {
    date = getFriendlyDateFromISODate(items[0].time);
  }

  const todaysWeather = `${items[0]?.description || 'probably raining'}`;

  const getTempFriendlyStyle = forecast => {
    log('forecast: ', forecast);
    const avgTempInt = Math.round(forecast.avgTemperature);
    const maxTempInt = Math.round(forecast.maxTemperature);

    if (getTemperatureFriendly(avgTempInt) === 'Hot 🥵') {
      return style.hot;
    }
    if (getTemperatureFriendly(avgTempInt) === 'Warm') {
      if (getTemperatureFriendly(Math.round(maxTempInt)) === 'Hot 🥵') {
        return style.warmToHot;
      }
      return style.warmToCold;
    }
    if (getTemperatureFriendly(avgTempInt) === 'Cold') {
      if (getTemperatureFriendly(Math.round(maxTempInt)) === 'Warm') {
        return style.coldToWarm;
      }
      return style.coldToFreezing;
    }
    if (getTemperatureFriendly(avgTempInt) === 'Freezing 🥶') {
      return style.freezing;
    }
  };

  return (
    <div style={style.container}>
      <Header
        title={meta.siteTitle}
        description={meta.location}
        image={(items && items[0] && items[0].icon) || meta.defaultImageSrc}
        alt={todaysWeather || meta.defaultDescription}
        temperatureClass={getTempFriendlyStyle(items[0])}
        meta={meta}
      />

      <Days
        items={items.map(item => {
          return {
            ...item,
            friendlyDate: getFriendlyDateFromISODate(item.time),
          };
        })}
      />

      <div style={style.blurb}>
        <Paper style={{ ...style.note, ...style.cta }}>
          <Typography variant="body1" component="p">
            Advert
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom align="center">
            <a href="https://www.louiechristie.com/blog/contact/">
              Like this? Let's make friendly technology together...
            </a>
          </Typography>
        </Paper>

        <Paper style={{ ...style.note, ...style.about }}>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            About
          </Typography>
          <Typography variant="body1" component="p" paragraph align="left">
            {meta.siteDescription}
          </Typography>
        </Paper>

        <Paper style={{ ...style.note, ...style.about }}>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Inspiration
          </Typography>

          <Typography
            style={style.quote}
            variant="body1"
            component="blockquote"
            paragraph
            align="left"
          >
            <q>
              Instead of broadcasting the weatherman... use local computing
              intelligence to transform them into a voice report, a printed map,
              or an animated cartoon with your favorite Disney character...
              whatever way you want
            </q>

            <cite style={style.inspiration}>
              - Nicholas Negropronte (1995). Being digital. New York: Knopf.
              p.55
              <sup>
                <a href="https://twitter.com/louiechristie/status/1344077058570412034">
                  †
                </a>
              </sup>
            </cite>
          </Typography>
        </Paper>
      </div>

      <Footer meta={meta} />
    </div>
  );
};

export default WeatherContainer;
