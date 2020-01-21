import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Day from './Day';

const styles = theme => ({
  ul: {
    margin: 0,
    padding: theme.spacing(2),

    listStyleType: 'none',
    textIndent: 0,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  li: {
    width: 260,
    flex: 1,
    marginBottom: theme.spacing(2),
    textIndent: 0,
  },
});

class WeatherWidget extends Component {
  render() {
    const { classes, items } = this.props;

    return (
      <ul className={classes.ul}>
        {items.map(item => {
          return (
            <li key={`${item.date}`} className={classes.li}>
              <Day
                date={item.date}
                icon={item.icon}
                description={item.description}
                temperature={item.temperature}
                relativeHumidity={item.relativeHumidity}
              />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default withStyles(styles)(WeatherWidget);
