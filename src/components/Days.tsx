import { theme } from '../utilities/theme';
import getThirdDayOfHeatwaveIndex from '../utilities/heatWaveUtils';
import Day from './Day';
import Advert from './Advert';

import { Items } from '@/utilities/transformMetOfficeJSON';

export const styles = {
  ul: {
    margin: 0,
    padding: 0,
    paddingTop: theme.spacing(4),
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  li: {
    flex: 1,
    textIndent: 0,
    listStyle: 'none',
    margin: 0,
    padding: 0,
    marginBottom: theme.spacing(4),
    // borderWidth: 2,
    // borderStyle: 'solid',
    // borderColor: 'red',
  },
  adContainer: {
    maxWidth: 320,
    textAlign: 'center',
  },
} as const;

interface Props {
  items: Items;
}

const Days = (props: Props) => {
  const { items } = props;

  const thirdDayOfHeatWaveIndex = getThirdDayOfHeatwaveIndex(items);

  let days = items.map((item, index) => {
    const { time } = item;

    return (
      <li style={styles.li} key={time}>
        <Day {...item} />
      </li>
    );
  });

  if (thirdDayOfHeatWaveIndex !== -1) {
    days = days.toSpliced(
      thirdDayOfHeatWaveIndex,
      0,
      <li
        style={{ ...styles.li, ...styles.adContainer }}
        key={'advert-heatwave'}
      >
        <Advert />
      </li>
    );
  }

  return <ul style={styles.ul}>{days}</ul>;
};

export default Days;
