import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {
  getIsTooHotForRoomTemperatureFromCelsius,
  getIsTooColdForRoomTemperatureFromCelsius,
  getIsFrostyFromCelsius,
  getTemperatureFriendly,
} from '../utilities/getRoomTemperatureComfortFromCelsius';

const styles = (theme) => ({
  card: {
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 5,
    boxSizing: 'border-box',
    aspectRatio: 1 / 1,
    minWidth: 250,
    maxWidth: '90vw',
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  friendlyDate: {
    marginBottom: -theme.spacing(2),
  },
  svgIcon: {
    width: 48 * 2,
    height: 48 * 2,
  },
  description: {
    marginTop: -theme.spacing(2),
    paddingTop: 0,
    marginBottom: theme.spacing(1),
  },
  chips: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  chip: {
    marginBottom: theme.spacing(1),
    fontSize: '1rem',
    borderRadius: 5,
  },
  temperatureOuter: {
    width: '100%',
    marginTop: '5px',
    display: 'flex',
    flexDirection: 'row',
  },
  temperatureContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 250,
    borderRadius: '5px 5px 0 0',
  },
  colorScale: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    // borderRadius: '5px 5px 0 0',
    overflow: 'hidden',
  },
  scaleNumber: {
    fontSize: '0.8rem',
    lineHeight: '1.2rem',
  },
  indicator: {
    fontSize: '0.6rem',
    lineHeight: '0.6rem',
  },
  temperature: {
    flex: 1,
    paddingTop: '4px',
    paddingBottom: '8px',
  },
  swatch: {},
  freezingSwatch: {
    flex: 18035,
  },
  coldSwatch: {
    flex: 64146,
  },
  warmSwatch: {
    flex: 9975,
  },
  hotSwatch: {
    flex: 11,
  },
  warm: {
    color: 'black',
    borderWidth: 0,
    backgroundColor: '#f1d220',
  },
  hot: {
    color: 'white',
    borderWidth: 0,
    backgroundColor: '#cc0605',
  },
  cold: {
    color: 'white',
    borderWidth: 0,
    backgroundColor: '#0075c4',
  },
  freezing: {
    color: 'white',
    borderWidth: 0,
    backgroundColor: '#004a93',
  },
  dry: {
    color: '#cc0605',
    borderColor: '#cc0605',
    backgroundColor: 'white',
  },
  sticky: {
    color: '#3F51B5',
    borderColor: '#3F51B5',
  },
  // emoji: {
  //   textShadow: '-2px 0 white, 0 2px white, 2px 0 white, 0 -2px white',
  // }
});

function Day(props) {
  const {
    classes,
    friendlyDate,
    time,
    icon,
    description,
    minTemperature,
    maxTemperature,
    avgTemperature,
    isSticky,
    isDry,
    isTakeRaincoat,
  } = props;

  const avgTempInt = Math.round(avgTemperature);
  const minTempInt = Math.round(minTemperature);
  const maxTempInt = Math.round(maxTemperature);

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

  const spacer = 3;

  const getNumberForScale = (tempInt) => {
    const isAvgTemp = tempInt === avgTempInt;
    const isMinTemp = tempInt === minTempInt;
    const isMaxTemp = tempInt === maxTempInt;

    if (maxTempInt - minTempInt >= spacer) {
      // If a decent temp change show range
      if (isMinTemp) return tempInt;
      if (isMaxTemp) return tempInt;
      if (isAvgTemp && avgTempInt - minTempInt >= spacer) return tempInt;
      if (isAvgTemp && maxTempInt - avgTempInt >= spacer) return tempInt;
    } else {
      // Else show avg only decent temp change
      if (isAvgTemp) return tempInt;
    }

    if (tempInt % 10 === 0) {
      //temperature is a multiple of ten e.g. 0, 10, 20
      const isAwayFromAvgTemp =
        tempInt < avgTempInt - spacer || tempInt > avgTempInt + spacer;
      const isAwayFromMinTemp =
        tempInt < minTempInt - spacer || tempInt > minTempInt + spacer;
      const isAwayFromMaxTemp =
        tempInt < maxTempInt - spacer || tempInt > maxTempInt + spacer;

      if (isAwayFromAvgTemp && isAwayFromMinTemp && isAwayFromMaxTemp)
        return tempInt;
    }

    return '';
  };

  const getIndicator = (tempInt) => {
    const isAvgTemp = tempInt === avgTempInt;
    const isMinTemp = tempInt === minTempInt;
    const isMaxTemp = tempInt === maxTempInt;

    if (maxTempInt - minTempInt >= spacer) {
      // If a decent temp change show range
      // If a decent temp change show range
      if (isMinTemp) return '⇤';
      if (isMaxTemp) return '⇥';
      if (isAvgTemp && !isMinTemp) return '▲';
      if (isAvgTemp && !isMaxTemp) return '▲';
    } else {
      // Else show avg only decent temp change
      if (isAvgTemp) return '▲';
    }

    return '\u00A0';
  };

  // Temperatures and tally of days ever had that temperature in UK
  // Previously calculated using command line utility /data/daily/daily.js
  const tempTallies = {
    '-12': 1,
    '-11': 1,
    '-9': 5,
    '-8': 19,
    '-7': 40,
    '-6': 53,
    '-5': 98,
    '-4': 221,
    '-3': 391,
    '-2': 607,
    '-1': 1091,
    0: 1650,
    1: 2441,
    2: 2988,
    3: 3794,
    4: 4486,
    5: 5189,
    6: 5605,
    7: 5918,
    8: 5657,
    9: 5457,
    10: 5215,
    11: 4904,
    12: 4917,
    13: 5495,
    14: 6000,
    15: 5584,
    16: 4697,
    17: 3441,
    18: 2248,
    19: 1305,
    20: 700,
    21: 333,
    22: 153,
    23: 64,
    24: 16,
    25: 9,
  };

  const temperatures = Object.keys(tempTallies).sort(function (a, b) {
    return a - b;
  });

  const isOffTheScaleHot =
    Math.round(maxTemperature) >
    parseInt(temperatures[temperatures.length - 1], 10);

  const isOffTheScaleCold =
    Math.round(minTemperature) < parseInt(temperatures[0], 10);

  return (
    <Card key={time} className={classes.card} align="center">
      <div>
        <Typography
          variant="h5"
          component="h2"
          className={classes.friendlyDate}
        >
          {friendlyDate}
        </Typography>
        {/* <Typography variant="h6" component="p">
        Time: {time}
      </Typography> */}
      </div>
      <div>
        <img className={classes.svgIcon} src={icon} alt={description} />
        <Typography className={classes.description} variant="h6" component="p">
          {description}
        </Typography>
      </div>
      <div>
        <Box style={{ flex: 1 }}>
          {isSticky && <Chip label={'Sticky 💦'} className={classes.chip} />}

          {isDry && (
            <Chip
              label={'Dry eyes/skin 👁'}
              className={`${classes.chip} ${classes.dry}`}
            />
          )}
          {(isOffTheScaleHot || isOffTheScaleCold) && (
            <Chip
              label={`Off the scale ${isOffTheScaleHot ? 'hot' : 'cold'}`}
              className={classes.chip}
            />
          )}
          {isTakeRaincoat && (
            <Chip
              label={'Take raincoat 🧥'}
              variant="outlined"
              className={classes.chip}
            />
          )}
          <div className={classes.temperatureOuter}>
            <Box
              className={`${classes.swatch} ${minTemperature}`}
              style={{ flex: 1 }}
            >
              <div className={classes.scaleNumber}>
                {isOffTheScaleCold && getNumberForScale(minTempInt)}{' '}
              </div>

              {(isOffTheScaleCold || isOffTheScaleHot) && (
                <div className="indicator" style={{ minWidth: '20px' }}>
                  <Typography variant="body2" component="p">
                    {isOffTheScaleCold && getIndicator(minTempInt)}
                    {'\u00A0'}
                  </Typography>
                </div>
              )}
            </Box>

            <Box
              className={`${
                classes.temperatureContainer
              } ${getTempFriendlyClassName(avgTempInt)}`}
            >
              <Box className={classes.colorScale}>
                {temperatures.map((key) => {
                  const tempInt = parseInt(key, 10);
                  const tally = tempTallies[key];

                  return (
                    <Box
                      key={key}
                      className={`
                        ${classes.swatch} 
                        ${getTempFriendlyClassName(tempInt)}
                        ${tempInt}`}
                      style={{
                        flex: tally,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <div className={classes.scaleNumber}>
                        {getNumberForScale(tempInt)}
                      </div>
                      <div className={classes.indicator}>
                        {getIndicator(tempInt)}
                      </div>
                    </Box>
                  );
                })}
              </Box>
              <Box className={classes.temperature}>
                <Typography variant="body1" component="p">
                  {getTemperatureFriendly(avgTempInt)}
                </Typography>
              </Box>
            </Box>

            <Box
              className={`${classes.swatch} ${maxTempInt}`}
              style={{ flex: 1 }}
            >
              <div className={classes.scaleNumber}>
                {' '}
                {isOffTheScaleHot && getNumberForScale(maxTempInt)}
              </div>

              {(isOffTheScaleHot || isOffTheScaleCold) && (
                <div className={classes.indicator} style={{ minWidth: '20px' }}>
                  {'\u00A0'}
                  {isOffTheScaleHot && getIndicator(maxTempInt)}
                </div>
              )}
            </Box>
          </div>
        </Box>
      </div>
    </Card>
  );
}

export default withStyles(styles)(Day);
