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
  },
  titles: {
    display: 'flex',
    flexDirection: 'column',
  },
};

function SimpleAppBar(props) {
  const { classes, title, description, image, alt, url } = props;

  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            monetization
          }
        }
      }
    `
  );

  const { siteUrl, monetization } = data.site.siteMetadata;

  return (
    <AppBar position="static">
      <Helmet>
        <link id="favicon" rel="icon" sizes="any" href={image} />
        <link rel="mask-icon" href={image} color="DimGrey" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`${siteUrl}/og-image-${dayjs().format('YYYY-MM-DD')}.png`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary" />
        <meta name="monetization" content={monetization} />
      </Helmet>

      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
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

export default withStyles(styles)(SimpleAppBar);
