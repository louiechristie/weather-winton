import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  note: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10px',
    padding: '10px',
    maxWidth: '300px',
  },
});

const Footer = props => {
  const { classes, meta } = props;
  return (
    <footer className={classes.footer}>
      <Paper className={classes.note}>
        <Typography variant="body2" component="p">
          Weather data: Met Office
        </Typography>

        <Typography variant="body2" component="p" color="inherit">
          Made by <a href={meta.author.url}> {meta.author.name}</a>
        </Typography>
      </Paper>
    </footer>
  );
};

export default withStyles(styles)(Footer);
