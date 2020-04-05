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
  temperatureContainer: {
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5px',
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
    color: 'black',
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
    temperature,
    isSticky,
    isDry,
  } = props;

  const getTemperatureClassName = temperature => {
    if (getIsTooHotForRoomTemperatureFromCelsius(temperature)) {
      return classes.hot;
    }
    if (getIsFrostyFromCelsius(temperature)) {
      return classes.freezing;
    }
    if (getIsTooColdForRoomTemperatureFromCelsius(temperature)) {
      return classes.cold;
    }
    return classes.warm;
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

  const keys = Object.keys(tempTallies).sort(function(a, b) {
    return a - b;
  });

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

          {temperature && (
            <Box
              className={`${
                classes.temperatureContainer
              } ${getTemperatureClassName(temperature)}`}
            >
              <Box className={classes.colorScale}>
                {keys.map(key => {
                  const integer = parseInt(key, 10);
                  const tally = tempTallies[key];
                  return (
                    <Box
                      key={key}
                      className={`${classes.swatch} ${getTemperatureClassName(
                        integer
                      )}`}
                      style={{ flex: tally }}
                    >
                      &nbsp;
                      {integer === temperature && '▲'}
                    </Box>
                  );
                })}
              </Box>
              <Box className={classes.temperature}>
                {getTemperatureFriendly(temperature)}
              </Box>
            </Box>
          )}
        </Box>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(Day);
