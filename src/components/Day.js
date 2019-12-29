import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import getRoomTemperatureComfortFromCelsius, {
  TOO_HOT,
  TOO_COLD
} from '../utilities/getRoomTemperatureComfortFromCelsius';

const styles = theme => ({
  card: {
    boxSizing: 'borderBox',
    padding: theme.spacing(2),

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chip: {
    backgroundColor: 'white',
    color: 'orange',
    fontWeight: 'bold',
    borderWidth: 3,
    borderColor: 'orange',
    borderStyle: 'solid'
  },
  tooHot: {
    color: 'red',
    borderColor: 'red'
  },
  tooCold: {
    color: 'blue',
    borderColor: 'blue'
  }
});

function Day(props) {
  const { classes, date, icon, description, temperature } = props;

  const getClassName = () => {
    if (getRoomTemperatureComfortFromCelsius(temperature) === TOO_HOT) {
      return classes.tooHot;
    }
    if (getRoomTemperatureComfortFromCelsius(temperature) === TOO_COLD) {
      return classes.tooCold;
    }
    return classes.chip;
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
      {temperature && (
        <CardActions>
          <div>
            <Chip
              label={`${temperature}°C`}
              className={`${classes.chip} ${getClassName(temperature)}`}
            />
          </div>
        </CardActions>
      )}
    </Card>
  );
}

export default withStyles(styles)(Day);
