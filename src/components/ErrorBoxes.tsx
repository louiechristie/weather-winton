import React from 'react';

import { theme, Card, Typography } from '../utilities/theme';
import type Meta from '@/types/meta';
import { ErrorItems } from '@/error/getErrorItems';

import { styles as listStyles } from '@/components/Days';

const styles: { [key: string]: React.CSSProperties } = {
  friendlyDate: {},
  svgIcon: {
    width: 48 * 2,
    height: 48 * 2,
  },
  description: {
    paddingTop: 0,
    marginBottom: theme.spacing(1),
  },
  labels: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  label: {
    marginBottom: theme.spacing(1),
    fontSize: '1rem',
    borderRadius: 20,
  },
  temperatureOuter: {
    width: '100%',
    marginTop: '5px',
    display: 'flex',
    flexDirection: 'row',
  },
  temperatureContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 250,
    borderRadius: '20px 20px 0 0',
  },
  colorScale: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  indicator: {
    fontSize: '0.6rem',
    lineHeight: '0.6rem',
  },
  temperature: {
    flex: 1,
    paddingTop: '4px',
    paddingBottom: '8px',
  },
  swatch: {},
  freezingSwatch: {
    flex: 18035,
  },
  coldSwatch: {
    flex: 64146,
  },
  warmSwatch: {
    flex: 9975,
  },
  hotSwatch: {
    flex: 11,
  },
  warm: {
    color: 'rgba(0,0,0, 0.75)',
    borderWidth: 0,
    backgroundColor: '#f1d220',
  },
  hot: {
    color: 'white',
    borderWidth: 0,
    backgroundColor: '#cc0605',
  },
  cold: {
    color: 'white',
    borderWidth: 0,
    backgroundColor: '#0075c4',
  },
  freezing: {
    color: 'rgba(1,1,1, 0.75)',
    borderWidth: 0,
    backgroundColor: '#004a93',
  },
  dry: {
    color: '#cc0605',
    borderColor: '#cc0605',
    backgroundColor: 'white',
  },
  sticky: {
    color: '#3F51B5',
    borderColor: '#3F51B5',
  },
  // emoji: {
  //   textShadow: '-2px 0 white, 0 2px white, 2px 0 white, 0 -2px white',
  // }
};

interface Props {
  meta: Meta;
  items: ErrorItems;
  errorMessage: string;
}

const ErrorBoxes = (props: Props) => {
  const { items } = props;

  return (
    <ul style={listStyles.ul}>
      {items.map((item, index) => {
        const { friendlyDate, time, icon, description } = item;

        return (
          <li style={listStyles.li} key={time}>
            <Card>
              <div>
                <Typography
                  variant="h5"
                  component="h2"
                  style={styles.friendlyDate}
                >
                  {friendlyDate}
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  style={{ display: 'none' }}
                >
                  Time: {time}
                </Typography>
              </div>
              <div>
                <img style={styles.svgIcon} src={icon} alt={description} />
                <Typography
                  style={styles.description}
                  variant="h6"
                  component="p"
                >
                  {description}
                </Typography>
              </div>
            </Card>
          </li>
        );
      })}
    </ul>
  );
};

export default ErrorBoxes;
