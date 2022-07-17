import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';

import { getTemperatureFriendly } from '../utilities/getRoomTemperatureComfortFromCelsius';

const styles = (theme) => ({
  card: {
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 5,
    boxSizing: 'border-box',
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
  labels: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  label: {
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
    indicativeTemperature,
    isSticky,
    isDry,
    isTakeRaincoat,
  } = props;

  const indicativeTempInt = Math.round(indicativeTemperature);
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
    const isIndicativeTemp = tempInt === indicativeTempInt;
    const isMinTemp = tempInt === minTempInt;
    const isMaxTemp = tempInt === maxTempInt;

    if (maxTempInt - minTempInt >= spacer) {
      // If a decent temp change show range
      if (isMinTemp) return tempInt;
      if (isMaxTemp) return tempInt;
      if (
        isIndicativeTemp &&
        indicativeTempInt - minTempInt >= spacer &&
        maxTempInt - indicativeTempInt >= spacer
      )
        return tempInt;
    } else {
      // Else show indicative only decent temp change
      if (isIndicativeTemp) return tempInt;
    }

    if (tempInt % 10 === 0) {
      //temperature is a multiple of ten e.g. 0, 10, 20
      const isAwayFromIndicativeTemp =
        tempInt < indicativeTempInt - spacer ||
        tempInt > indicativeTempInt + spacer;
      const isAwayFromMinTemp =
        tempInt < minTempInt - spacer || tempInt > minTempInt + spacer;
      const isAwayFromMaxTemp =
        tempInt < maxTempInt - spacer || tempInt > maxTempInt + spacer;

      if (isAwayFromIndicativeTemp && isAwayFromMinTemp && isAwayFromMaxTemp)
        return tempInt;
    }

    return '';
  };

  const getIndicator = (tempInt) => {
    const isIndicativeTemp = tempInt === indicativeTempInt;
    const isMinTemp = tempInt === minTempInt;
    const isMaxTemp = tempInt === maxTempInt;

    if (maxTempInt - minTempInt >= spacer) {
      // If a decent temp change show range
      if (isIndicativeTemp) return '▲';
      if (isMinTemp) return '⇤';
      if (isMaxTemp) return '⇥';
    } else {
      // Else show indicative only
      if (isIndicativeTemp) return '▲';
    }

    return '\u00A0';
  };

  // Temperatures and tally of days ever had that temperature in UK
  // Previously calculated using command line utility /data/daily/daily.js
  const tempTallies = {
    0: 40972,
    1: 59690,
    2: 73070,
    3: 92082,
    4: 108816,
    5: 125365,
    6: 135230,
    7: 142920,
    8: 137429,
    9: 133162,
    10: 127651,
    11: 120447,
    12: 119725,
    13: 132029,
    14: 142536,
    15: 132340,
    16: 111931,
    17: 83007,
    18: 55343,
    19: 32912,
    20: 18501,
    21: 9511,
    22: 5011,
    23: 2440,
    24: 1065,
    25: 697,
    26: 354,
    27: 205,
    28: 155,
    29: 97,
    30: 43,
    31: 19,
    32: 7,
    33: 7,
    34: 1,
    '-16': 1,
    '-14': 1,
    '-13': 11,
    '-12': 32,
    '-11': 38,
    '-10': 20,
    '-9': 155,
    '-8': 490,
    '-7': 1044,
    '-6': 1407,
    '-5': 2559,
    '-4': 5620,
    '-3': 9790,
    '-2': 15313,
    '-1': 27092,
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
        <Box className={classes.labels}>
          {isSticky && (
            <div variant="outlined" className={classes.label}>
              Sticky 💦
            </div>
          )}

          {isDry && (
            <div className={`${classes.label} ${classes.dry}`}>
              Dry eyes/skin 👁
            </div>
          )}
          {(isOffTheScaleHot || isOffTheScaleCold) && (
            <div variant="outlined" className={classes.label}>{`Off the scale ${
              isOffTheScaleHot ? 'hot 🥵' : 'cold 🥶'
            }`}</div>
          )}
          {isTakeRaincoat && (
            <div className={classes.label}>Take raincoat 🧥</div>
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
              } ${getTempFriendlyClassName(avgTemperature)}`}
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
                  {getTemperatureFriendly(avgTemperature)}
                </Typography>
              </Box>
            </Box>

            <Box
              className={`${classes.swatch} ${maxTempInt}`}
              style={{ flex: 1 }}
            >
              <div className={classes.scaleNumber}>
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
