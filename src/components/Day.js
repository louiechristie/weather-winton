import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 260,
    maxWidth: 800,
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  media: {
    maxHeight: 140
  },
  chip: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

function Day(props) {
  const { classes, date, icon, text, avgtempC } = props;
  return (
    <Card className={classes.card}>
      <Typography gutterBottom variant="h6" component="h2">
        {date}
      </Typography>
      <img src={`https:${icon}`} alt={text} />
      <Typography variant="h5" component="p">
        {text}
      </Typography>
      <CardActions>
        <div>
          <Chip label={`${avgtempC}°C`} className={classes.chip} />
        </div>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(Day);
