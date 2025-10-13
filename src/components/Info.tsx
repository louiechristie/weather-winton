import React from 'react';
import { theme, Paper, Typography } from '@/utilities/theme';
import Meta from '@/types/meta';

const styles = {
  blurb: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: theme.spacing(2),
  },
  note: {
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 20,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    width: '300px',
  },
  cta: {
    maxWidth: 600,
  },
  quote: {
    margin: 0,
    marginLeft: 10,
    padding: 0,
  },
  inspiration: {
    display: 'block',
    textAlign: 'right',
    marginTop: 14,
    fontStyle: 'normal',
    fontSize: '1em',
  },
} as const;

interface Props {
  meta: Meta;
}

const Info = (props: Props) => {
  const { meta } = props;

  return (
    <div style={styles.blurb}>
      <Paper style={{ ...styles.note, ...styles.cta }}>
        <Typography variant="body1" component="p">
          Advert
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom align="center">
          <a href="https://www.louiechristie.com/contact/">
            Like this? Let&apos;s make friendly technology together...
          </a>
        </Typography>
      </Paper>

      <Paper style={{ ...styles.note }}>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          About
        </Typography>
        <Typography variant="body1" component="p" paragraph align="left">
          {meta.siteDescription}
        </Typography>
      </Paper>

      <Paper style={{ ...styles.note }}>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          Inspiration
        </Typography>

        <Typography
          style={styles.quote}
          variant="body1"
          component="blockquote"
          paragraph
          align="left"
        >
          <q>
            Instead of broadcasting the weatherman... use local computing
            intelligence to transform them into a voice report, a printed map,
            or an animated cartoon with your favorite Disney character...
            whatever way you want
          </q>

          <cite style={styles.inspiration}>
            - Nicholas Negropronte (1995). Being digital. New York: Knopf. p.55
            <sup>
              <a href="https://twitter.com/louiechristie/status/1344077058570412034">
                †
              </a>
            </sup>
          </cite>
        </Typography>
      </Paper>
    </div>
  );
};

export default Info;
