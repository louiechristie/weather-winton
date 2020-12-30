import React from 'react';
import dayjs from 'dayjs';

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
    maxWidth: '200px',
  },
  cta: {
    padding: '20px',
    maxWidth: '400px',
  },
});

const Footer = (props) => {
  const { classes, meta } = props;
  return (
    <footer className={classes.footer}>
      <Paper className={[classes.note, classes.cta]}>
        <Typography variant="h6" component="h6" gutterBottom>
          <a href="https://www.louiechristie.com/blog/contact/">
            Want me to build you an app or website?
          </a>
        </Typography>
        <Typography variant="body1" component="p">
          10% discount on blue ones
        </Typography>
      </Paper>

      <Paper className={[classes.note, classes.about]}>
        <Typography variant="h5" component="h2" gutterBottom>
          About
        </Typography>
        <Typography variant="body1" component="p" paragraph>
          Weather Winton is an {meta.description}
          <sup>
            <a href="https://twitter.com/louiechristie/status/1344077058570412034">
              †
            </a>
          </sup>
        </Typography>
      </Paper>

      <Paper className={[classes.note, classes.about]}>
        <Typography variant="body2" component="p" paragraph>
          Last updated: {meta.timeStamp}
        </Typography>
        <Typography variant="body2" component="p" paragraph>
          Weather data: Met Office
        </Typography>

        <Typography variant="body2" component="p" color="inherit" paragraph>
          ©️ {dayjs().year()} Weather Winton v{meta.version}
        </Typography>

        <Typography variant="body2" component="p" color="inherit" paragraph>
          Made by: <a href={meta.author.url}> {meta.author.name}</a>
        </Typography>
      </Paper>
    </footer>
  );
};

export default withStyles(styles)(Footer);
