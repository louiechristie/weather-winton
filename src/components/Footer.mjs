import React from 'react';
import dayjs from 'dayjs';
import { theme, Paper, Typography } from '../utilities/theme.mjs';

const styles = {
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(2),
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    borderTopStyle: 'solid',
    borderTopRadius: 20,
    backgroundColor: '#F8F8F8',
    marginBottom: '0',
  },
};

const HostedOn = () => {
  if (process.env.NETLIFY) {
    return (
      <>
        <img
          style={{ verticalAlign: 'middle' }}
          src="https://api.netlify.com/api/v1/badges/f0ee41e4-eb3b-44f3-8810-07d0a72ca9a1/deploy-status"
          alt="Netlify logo"
        />
      </>
    );
  }

  if (process.env.GATSBY_VERCEL_ENV === 'production') {
    return (
      <>
        <img
          style={{ verticalAlign: 'middle' }}
          src="https://deploy-badge.vercel.app/vercel/weather-winton"
          alt="Vercel logo"
        />
      </>
    );
  }

  return <>Local</>;
};

const Footer = props => {
  const { meta } = props;
  return (
    <Paper style={styles.footer} elevation={24} square>
      <Typography variant="body2" component="p" align="center">
        Last updated: {meta.timeStamp} | Hosted on: {HostedOn()}
      </Typography>

      <Typography variant="body2" component="p" align="center">
        Weather Winton ©️ {dayjs().year()} v{meta.version} | Tags: user
        experience, UX
      </Typography>

      <Typography variant="body2" component="p" paragraph align="center">
        Data from: Met Office | Contains public sector information licensed
        under the Open Government Licence
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
  );
};

export default Footer;
