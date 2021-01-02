import React from 'react';
import dayjs from 'dayjs';

import { withStyles } from '@material-ui/core/styles';

import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: theme.spacing(2),
  },
  note: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  cta: {
    width: 'initial',
    maxWidth: 600,
  },
  about: {
    width: 'initial',
    maxWidth: 300,
  },
  quote: {
    margin: 0,
    marginLeft: 10,
    padding: 0,
  },
  cite: {
    display: 'block',
    textAlign: 'right',
  },
});

const Footer = (props) => {
  const { classes, meta } = props;
  return (
    <footer className={classes.footer}>
      <Paper className={[classes.note, classes.cta]}>
        <Typography variant="h6" component="h6" gutterBottom align="center">
          <a href="https://www.louiechristie.com/blog/contact/">
            Want me to build you an app or website?
          </a>
        </Typography>
        <Typography variant="body1" component="p">
          10% discount on blue ones
        </Typography>
      </Paper>

      <Paper className={[classes.note, classes.about]}>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          About
        </Typography>

        <Typography variant="body1" component="p" paragraph>
          Weather Winton is an experiment in friendly weather forecasting.
        </Typography>

        <Typography variant="body1" component="p" paragraph>
          <blockquote className={classes.quote}>
            <q>
              Instead of broadcasting the weatherman... use local computing
              intelligence to transform them into a voice report, a printed map,
              or an animated cartoon with your favorite Disney character...
              whatever way you want
            </q>
            <cite className={classes.cite}>
              - Nicholas Negropronte (1995). <br />
              Being digital. New York: Knopf. p.55
              <sup>
                <a href="https://twitter.com/louiechristie/status/1344077058570412034">
                  †
                </a>
              </sup>
            </cite>
          </blockquote>{' '}
        </Typography>
      </Paper>

      <Paper className={classes.note}>
        <Typography variant="body2" component="p" paragraph align="center">
          Last updated: {meta.timeStamp}; Weather data: Met Office; Weather
          Winton ©️ {dayjs().year()} v{meta.version}; Tags: user experience, UX
        </Typography>

        <Typography
          variant="body2"
          component="p"
          color="inherit"
          paragraph
          align="center"
        >
          Made by: <a href={meta.author.url}> {meta.author.name}</a>
        </Typography>
      </Paper>
    </footer>
  );
};

export default withStyles(styles)(Footer);
