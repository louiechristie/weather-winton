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
  chips: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  chip: {
    flex: 1,
    minWidth: '100px',
    marginTop: '5px',
    marginBottom: '5px',
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
    minWidth: '100px',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5px',
    marginBottom: '5px',
    borderRadius: 4,
  },
  colorScale: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  temperature: {
    flex: 1,
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  swatch: {
    fontSize: '0.1px',
  },
  freezingSwatch: {
    flex: 18035,
    borderRadius: '4px 0 0 0',
  },
  coldSwatch: {
    flex: 64146,
  },
  warmSwatch: {
    flex: 9975,
  },
  hotSwatch: {
    flex: 11,
    borderRadius: '0 4px 0 0',
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
    borderWidth: 0,
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
    if (!temperature) return null;

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

  // Color scale from https://rmets.onlinelibrary.wiley.com/doi/full/10.1002/joc.6213

  return (
    <Card className={classes.card} align="center">
      <Typography gutterBottom variant="h5" component="h2">
        {date}
      </Typography>
      <img src={icon} alt={description} />
      <Typography variant="h6" component="p">
        {description}
      </Typography>
      <CardActions>
        <Box>
          {temperature && (
            <Box
              className={`${
                classes.temperatureContainer
              } ${getTemperatureClassName(temperature)}`}
            >
              <Box
                className={[
                  classes.swatch,
                  getTemperatureClassName(temperature / 10),
                ]}
              ></Box>
              <Box className={classes.colorScale}>
                <Box
                  className={`${classes.swatch} ${classes.freezingSwatch} ${classes.freezing}`}
                >
                  &nbsp;
                </Box>
                <Box
                  className={`${classes.swatch} ${classes.coldSwatch} ${classes.cold}`}
                >
                  &nbsp;
                </Box>
                <Box
                  className={`${classes.swatch} ${classes.warmSwatch} ${classes.warm}`}
                >
                  &nbsp;
                </Box>
                <Box
                  className={`${classes.swatch} ${classes.hotSwatch} ${classes.hot}`}
                >
                  &nbsp;
                </Box>
              </Box>
              <Box className={classes.temperature}>
                {getTemperatureFriendly(temperature)}
              </Box>
            </Box>
          )}
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
        </Box>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(Day);
