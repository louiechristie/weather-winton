import React from 'react';

import { Typography, AppBar, IconButton, Toolbar } from '../utilities/theme';
import Link from 'next/link';

import Meta from '@/types/meta';

const styles = {
  root: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  appBar: {
    borderBottomWidth: 4,
    borderBottomStyle: 'solid',
    borderBottomRadius: 20,
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
} as const;

interface Props {
  title: string;
  description: string;
  image: string;
  alt: string;
  temperatureClass: React.CSSProperties;
  meta: Meta;
}

function Header(props: Props) {
  const { title, description, image, alt, temperatureClass } = props;

  return (
    <AppBar position="static" style={{ ...styles.appBar, ...temperatureClass }}>
      <Toolbar>
        <Link href="/">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <img style={styles.logo} src={image} alt={alt} />
          </IconButton>
        </Link>
        <div style={styles.titles}>
          <Typography variant="h6" component="h1">
            {title}
          </Typography>
          <Typography variant="body1" component="p">
            {description}
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
