import { withStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import { Link } from 'gatsby';
import React, { Component } from 'react';
import { TwitterVideoEmbed } from 'react-twitter-embed';

import { getIsTooDryFromRelativeHumidity } from '../utilities/getComfortFromRelativeHumidity';
import getIsStickyFromCelsiusAndRelativeHumidity from '../utilities/getIsStickyFromCelsiusAndRelativeHumidity';
import Day from './Day';

const heatWaveTemperature = 30;

const styles = (theme) => ({
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
    marginBottom: theme.spacing(4),
    textIndent: 0,
    listStyle: 'none',
    margin: 0,
    padding: 0,
    // borderWidth: 2,
    // borderStyle: 'solid',
    // borderColor: 'red',
  },
  link: { textDecoration: 'none' },
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
});

const findIndexOfLast = (array, condition) => {
  return array.length - 1 - [...array].reverse().findIndex(condition);
};

class Days extends Component {
  render() {
    const { classes, items } = this.props;

    return (
      <ul className={classes.ul}>
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
          } = item;

          return (
            <>
              <li key={time} className={classes.li}>
                <Link
                  className={`${classes.link}`}
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
            </>
          );
        })}
      </ul>
    );
  }
}

const AdvertCore = (props) => {
  const { classes } = props;

  return (
    <li className={`${classes.li} ${classes.adContainer}`}>
      <h6 className={`${classes.adText} `}>Advert</h6>

      <div className={`${classes.adLinked} `}>
        <TwitterVideoEmbed id="1547990626641137666" />

        <Link
          className={`${classes.link} ${classes.ad}`}
          to="https://twitter.com/StellaArtoisUK/status/1547990626641137666"
        />
      </div>

      <p className={`${classes.adText} `}>
        Why?: Because it's a heatwave, show a picture of{' '}
        <Link to="https://undergroundcomedian.wordpress.com/gonzo/">
          Nigel Thomas
        </Link>{' '}
        with his shirt off
      </p>
      <p className={`${classes.adText}`}>(Sunglasses recommended 😎)</p>
      <h6 className={`${classes.adText}`}>End of Advert</h6>
    </li>
  );
};

const Advert = withStyles(styles)(AdvertCore);

export default withStyles(styles)(Days);
