import React from 'react';
import dayjs from 'dayjs';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '48px',
    height: '48px',
    backgroundColor: 'white',
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 48,
  },
  titles: {
    display: 'flex',
    flexDirection: 'column',
  },
};

function Header(props) {
  const {
    classes,
    title,
    description,
    image,
    alt,
    url,
    temperatureClass,
    meta: {
      siteTitle,
      siteDescription,
      siteUrl,
      monetization,
      todaysWeather,
      location,
    },
  } = props;

  console.log('siteUrl: ' + siteUrl);

  return (
    <AppBar
      position="static"
      style={{
        borderBottomWidth: 4,
        borderBottomStyle: 'solid',
        borderBottomRadius: 20,
      }}
      className={temperatureClass}
    >
      <Helmet>
        <link id="favicon" rel="icon" sizes="any" href={image} />
        <link rel="mask-icon" href={image} color="DimGrey" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          property="og:title"
          content={`${todaysWeather} in ${location} | ${siteTitle}`}
        />
        <meta property="og:description" content={siteDescription} />
        <meta
          property="og:image"
          content={`${siteUrl}/og-image-${dayjs().format('YYYY-MM-DD')}.png`}
        />
        <link
          rel="apple-touch-icon"
          href={`${siteUrl}/apple-touch-icon.png`}
        ></link>
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/`} />
        <meta name="twitter:card" content="summary" />
        <meta name="monetization" content={monetization} />
      </Helmet>

      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <img className={classes.logo} src={image} alt={alt} />
        </IconButton>
        <div className={classes.titles}>
          <Typography variant="h6" component="h1" className={classes.title}>
            {title}
          </Typography>
          <Typography variant="body1" component="p" className={classes.title}>
            {description}
            </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Header);
