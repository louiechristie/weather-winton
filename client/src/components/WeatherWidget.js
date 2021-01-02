import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Day from './Day';

import { getIsTooDryFromRelativeHumidity } from '../utilities/getComfortFromRelativeHumidity';

import getIsStickyFromCelsiusAndRelativeHumidity from '../utilities/getIsStickyFromCelsiusAndRelativeHumidity';

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
          } = item;
          return (
            <li key={time} className={classes.li}>
              <Day
                friendlyDate={friendlyDate}
                time={time}
                icon={icon}
                description={description}
                minTemperature={minTemperature}
                maxTemperature={maxTemperature}
                avgTemperature={avgTemperature}
                isSticky={getIsStickyFromCelsiusAndRelativeHumidity(
                  avgTemperature,
                  relativeHumidity
                )}
                isDry={getIsTooDryFromRelativeHumidity(relativeHumidity)}
                isTakeRaincoat={isTakeRaincoat}
              />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default withStyles(styles)(WeatherWidget);
