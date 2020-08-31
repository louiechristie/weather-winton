import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {
  getIsTooHotForRoomTemperatureFromCelsius,
  getIsTooColdForRoomTemperatureFromCelsius,
  getIsFrostyFromCelsius,
} from '../utilities/getRoomTemperatureComfortFromCelsius';

const styles = theme => ({
  card: {
    boxSizing: 'borderBox',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgIcon: {
    width: 48 * 2,
    height: 48 * 2,
  },
  description: { marginTop: 0, paddingTop: 0 },
  chips: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  chip: {
    flex: 1,
    marginTop: '5px',
    marginBottom: '20px',
    paddingTop: '5px',
    paddingBottom: '5px',
    backgroundColor: 'white',
    color: '#3F51B5',
    borderWidth: 3,
    borderColor: '#3F51B5',
    borderStyle: 'solid',
    fontSize: '1em',
    borderRadius: 32 / 2,
  },
  temperatureOuter: {
    marginTop: '5px',
    display: 'flex',
    flexDirection: 'row',
  },
  temperatureContainer: {
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '4px',
  },
  colorScale: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '4px 4px 0 0',
    overflow: 'hidden',
  },
  temperature: {
    flex: 1,
    paddingTop: '4px',
    paddingBottom: '8px',
  },
  swatch: {
    fontSize: '8px',
  },
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
    color: '#222222',
    borderWidth: 0,
    backgroundColor: '#ffbf00',
  },
  hot: {
    color: 'white',
    borderWidth: 0,
    backgroundColor: '#cc0605',
  },
  cold: {
    color: 'white',
    borderWidth: 0,
    backgroundColor: '#3F51B5',
  },
  freezing: {
    color: 'white',
    borderWidth: 0,
    backgroundColor: '#002984',
  },
  // minBorder: {
  //   borderColor: 'green',
  //   borderWidth: 1,
  //   borderRightWidth: 0,
  //   borderStyle: 'dashed',
  //   borderTopLeftRadius: 4,
  //   borderBottomLeftRadius: 4,

  // },
  // maxBorder: {
  //   borderColor: 'green',
  //   borderWidth: 1,
  //   borderLeftWidth: 0,
  //   borderStyle: 'dashed',
  //   borderTopRightRadius: 4,
  //   borderBottomRightRadius: 4,
  // },
  // middleBorder: {
  //   borderColor: 'green',
  //   borderWidth: 0,
  //   borderTopWidth: 1,
  //   borderBottomWidth: 1,
  //   borderStyle: 'dashed',
  // },
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

const getTemperatureFriendly = celsius => {
  if (!celsius) return null;

  if (getIsTooHotForRoomTemperatureFromCelsius(celsius)) {
    return 'Hot 🥵';
  }
  if (getIsFrostyFromCelsius(celsius)) {
    return 'Freezing 🥶';
  }
  if (getIsTooColdForRoomTemperatureFromCelsius(celsius)) {
    return 'Cold';
  }
  return 'Warm';
};

function Day(props) {
  const {
    classes,
    date,
    icon,
    description,
    minTemperature,
    maxTemperature,
    avgTemperature,
    isSticky,
    isDry,
  } = props;

  const getTempFriendlyClassName = temperature => {
    if (getIsTooHotForRoomTemperatureFromCelsius(temperature)) {
      return `${classes.hot} hot`;
    }
    if (getIsFrostyFromCelsius(temperature)) {
      return `${classes.freezing} freezing`;
    }
    if (getIsTooColdForRoomTemperatureFromCelsius(temperature)) {
      return `${classes.cold} cold`;
    }
    return `${classes.warm} warm`;
  };

  // const getBorderClassName = temperature => {
  //   const minTempInt = Math.round(minTemperature);
  //   const maxTempInt = Math.round(maxTemperature);

  //   if (temperature === minTempInt) {
  //     return classes.minBorder;
  //   }
  //   if (temperature === maxTempInt) {
  //     return classes.maxBorder;
  //   }
  //   if (
  //     (temperature > minTempInt)
  //     &&
  //     (temperature < maxTempInt)) {
  //     return classes.middleBorder;
  //   }
  //   return '';
  // };

  const getIndicator = temperature => {
    const minTempInt = Math.round(minTemperature);
    const maxTempInt = Math.round(maxTemperature);
    const avgTempInt = Math.round(avgTemperature);

    if (temperature === minTempInt) {
      return '⇤';
    }
    if (temperature === maxTempInt) {
      return '⇥';

    }
    if (temperature === avgTempInt) {
      return '▲';
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
    '0': 1650,
    '1': 2441,
    '2': 2988,
    '3': 3794,
    '4': 4480,
    '5': 5177,
    '6': 5586,
    '7': 5909,
    '8': 5639,
    '9': 5445,
    '10': 5208,
    '11': 4893,
    '12': 4908,
    '13': 5483,
    '14': 5988,
    '15': 5568,
    '16': 4675,
    '17': 3434,
    '18': 2245,
    '19': 1302,
    '20': 700,
    '21': 333,
    '22': 151,
    '23': 63,
    '24': 15,
    '25': 9,
  };

  const temperatures = Object.keys(tempTallies).sort(function(a, b) {
    return a - b;
  });

  const isOffTheScaleHot =
    Math.round(avgTemperature) > parseInt(temperatures[temperatures.length - 1], 10);

  const isOffTheScaleCold = Math.round(avgTemperature) < parseInt(temperatures[0], 10);

  return (
    <Card className={classes.card} align="center">
      <Typography gutterBottom variant="h5" component="h2">
        {date}
      </Typography>
      <img className={classes.svgIcon} src={icon} alt={description} />
      <Typography className={classes.description} variant="h6" component="p">
        {description}
      </Typography>
      <CardActions>
        <Box>
          {isSticky && (
            <Chip
              label={'Sticky 💦'}
              className={`${classes.chip} ${classes.stick}`}
            />
          )}
          
          {isDry && (
            <Chip
              label={'Dry eyes/skin 👁'}
              className={`${classes.chip} ${classes.dry}
              )}`}
            />
          )}
          {(isOffTheScaleHot || isOffTheScaleCold) && (
            <Chip
              label={'Off the scale '}
              className={`${classes.chip} ${classes.stick}`}
            />
          )}
          {avgTemperature && (
            <div class={classes.temperatureOuter}>
              <Box
                className={`${classes.swatch} ${avgTemperature}`}
                style={{ flex: 1 }}
              >
                <div>
                  {isOffTheScaleCold && avgTemperature}
                  {!isOffTheScaleCold && <span>&nbsp;&nbsp;</span>}
                </div>

                <div className="indicator">{isOffTheScaleCold && '▲'}</div>
              </Box>

              <Box
                className={`${
                  classes.temperatureContainer
                } ${getTempFriendlyClassName(avgTemperature)}`}
              >
                <Box className={classes.colorScale}>
                  {temperatures.map(key => {
                    const tempInt = parseInt(key, 10);
                    const avgTempInt = Math.round(avgTemperature);
                    const minTempInt = Math.round(minTemperature);
                    const maxTempInt = Math.round(maxTemperature);
                    const tally = tempTallies[key];

                    const displaySomeNumbersOnScale = (tempInt) => {

                      const spacer = 3;
                      const isAvgTemp = tempInt === avgTempInt
                      const isMinTemp = tempInt === minTempInt
                      const isMaxTemp = tempInt === maxTempInt

                      if(isAvgTemp || isMinTemp || isMaxTemp) return tempInt;

                      const isMultipleOfTen = tempInt % 10 === 0; //temperature is a multiple of ten e.g. 0, 10, 20
                      const isAwayFromAvgTemp = (tempInt < (avgTempInt - spacer)) || (tempInt > (avgTempInt + spacer))
                      const isAwayFromMinTemp = (tempInt < (minTempInt - spacer)) || (tempInt > (minTempInt + spacer))
                      const isAwayFromMaxTemp = (tempInt < (maxTempInt - spacer)) || (tempInt > (maxTempInt + spacer))

                      if(isMultipleOfTen && isAwayFromAvgTemp && isAwayFromMinTemp && isAwayFromMaxTemp) return tempInt;
                      
                      return "";
                    }

                    return (
                      <Box
                        key={key}
                        className={`
                          ${classes.swatch} 
                          ${getTempFriendlyClassName(tempInt)}
                          ${tempInt}`}
                        style={{ flex: tally, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}
                      >
                        
                          <div>
                            {displaySomeNumbersOnScale(tempInt)}
                          </div>
                          <div 
                            className={`
                              indicator`
                            }
                          >
                            {getIndicator(tempInt)}
                          </div>
                      </Box>
                    );
                  })}
                </Box>
                <Box className={classes.temperature}>
                  {getTemperatureFriendly(avgTemperature)}
                </Box>
              </Box>

              <Box
                className={`${classes.swatch} ${avgTemperature}`}
                style={{ flex: 1 }}
              >
                <div>
                  {isOffTheScaleHot && temperature}
                  {!isOffTheScaleHot && <span>&nbsp;&nbsp;</span>}
                </div>

                <div className="indicator">{isOffTheScaleHot && '▲'}</div>
              </Box>
            </div>
          )}
        </Box>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(Day);
