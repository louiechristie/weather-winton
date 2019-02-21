import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Day from './Day';

const styles = theme => ({
  ul: {
    padding: theme.spacing.unit * 2,
    margin: 0,
    textIndent: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#eeeeee'
  },
  li: {
    listStyleType: 'none'
  },
  media: {
    maxHeight: 140
  },
  chip: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

class WeatherWidget extends Component {
  render() {
    const { classes, items } = this.props;

    return (
      <ul className={classes.ul}>
        {items.map(item => {
          return (
            <li key={`${item.date_epoch}`} className={classes.li}>
              <Day
                date={item.date}
                icon={item.day.condition.icon}
                text={item.day.condition.text}
                avgtempC={item.day.avgtemp_c}
              />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default withStyles(styles)(WeatherWidget);
