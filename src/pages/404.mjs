import React from 'react';
import { Link } from 'gatsby';
import { Typography, theme } from '../utilities/theme.mjs';

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
};

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <Typography variant="h4" component="h1">
          Page not found
        </Typography>
        <Typography variant="body1" component="p">
          Try the <Link to="/">weather forecast</Link>
        </Typography>
      </div>
    </div>
  );
};

export default NotFoundPage;
