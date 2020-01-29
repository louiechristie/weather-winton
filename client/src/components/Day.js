import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import getRoomTemperatureComfortFromCelsius, {
  TOO_HOT,
  TOO_COLD,
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
  },
  comfortable: {
    color: 'black',
    borderColor: '#ffbf00',
    backgroundColor: '#ffbf00',
  },
  tooHot: {
    color: 'white',
    backgroundColor: '#cc0605',
    borderColor: '#cc0605',
  },
  tooCold: {
    color: 'white',
    backgroundColor: '#3F51B5',
    borderColor: '#3F51B5',
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
  if (getRoomTemperatureComfortFromCelsius(celsius) === TOO_HOT) {
    return 'Hot 🥵';
  }
  if (getRoomTemperatureComfortFromCelsius(celsius) === TOO_COLD) {
    return 'Cold 🥶';
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

  const getTemperatureClassName = () => {
    if (!temperature) return null;

    if (getRoomTemperatureComfortFromCelsius(temperature) === TOO_HOT) {
      return classes.tooHot;
    }
    if (getRoomTemperatureComfortFromCelsius(temperature) === TOO_COLD) {
      return classes.tooCold;
    }
    return classes.comfortable;
  };

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
        <div className={classes.chips}>
          {temperature && (
            <Chip
              label={`${getTemperatureFriendly(temperature)}`}
              className={`${classes.chip} ${getTemperatureClassName(
                temperature
              )}`}
            />
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
        </div>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(Day);
