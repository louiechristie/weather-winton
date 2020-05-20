import React from 'react';
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
    marginRight: '10px',
  },
};

function SimpleAppBar(props) {
  const { classes, title, description, image, alt, url } = props;

  return (
    <AppBar position="static">
      <Helmet>
        <link id="favicon" rel="icon" sizes="any" href={image} />
        <link rel="mask-icon" href={image} color="DimGrey" />

        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary" />
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
        <Typography variant="h6" component="h1" className={classes.title}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(SimpleAppBar);
