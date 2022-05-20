import { withStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import { Link } from 'gatsby';
import React, { Component } from 'react';

import { getIsTooDryFromRelativeHumidity } from '../utilities/getComfortFromRelativeHumidity';
import getIsStickyFromCelsiusAndRelativeHumidity from '../utilities/getIsStickyFromCelsiusAndRelativeHumidity';
import Day from './Day';

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
  },
  link: { textDecoration: 'none' },
});

class WeatherWidget extends Component {
  render() {
    const { classes, items } = this.props;

    return (
      <ul className={classes.ul}>
        {items.map((item) => {
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
            currentTemperature,
          } = item;
          return (
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
                  indicativeTemperature={currentTemperature || avgTemperature}
                  isSticky={getIsStickyFromCelsiusAndRelativeHumidity(
                    avgTemperature,
                    relativeHumidity
                  )}
                  isDry={getIsTooDryFromRelativeHumidity(relativeHumidity)}
                  isTakeRaincoat={isTakeRaincoat}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default withStyles(styles)(WeatherWidget);
