import { getTemperatureFriendly } from '@/utilities/getRoomTemperatureComfortFromCelsius';
import type { Item } from '@/utilities/transformMetOfficeJSON';

const styles: { [key: string]: React.CSSProperties } = {
  hot: {
    color: 'white',
    backgroundColor: '#cc0605',
    borderBottomColor: '#f1d220',
  },
  warmToHot: {
    color: 'black',
    backgroundColor: '#f1d220',
    borderBottomColor: '#cc0605',
  },
  warmToCold: {
    color: 'black',
    backgroundColor: '#f1d220',
    borderBottomColor: '#0075c4',
  },
  coldToWarm: {
    color: 'white',
    backgroundColor: '#0075c4',
    borderBottomColor: '#f1d220',
  },
  coldToFreezing: {
    color: 'white',
    backgroundColor: '#0075c4',
    borderBottomColor: '#004a93',
  },
  freezing: {
    color: 'white',
    backgroundColor: '#004a93',
    borderBottomColor: '#0075c4',
  },
} as const;

const getAppBarStyle = (forecast: Item) => {
  const averageTempInt = Math.round(forecast.averageTemperature);
  const maxTempInt = Math.round(forecast.maxTemperature);
  const temperatureFriendly = getTemperatureFriendly(averageTempInt);
  const maxTemperatureFriendly = getTemperatureFriendly(maxTempInt);

  if (temperatureFriendly === 'Hot 🥵') {
    return styles.hot;
  }
  if (temperatureFriendly === 'Warm') {
    if (maxTemperatureFriendly === 'Hot 🥵') {
      return styles.warmToHot;
    }
    return styles.warmToCold;
  }
  if (temperatureFriendly === 'Cold') {
    if (maxTemperatureFriendly === 'Warm') {
      return styles.coldToWarm;
    }
    return styles.coldToFreezing;
  }
  if (temperatureFriendly === 'Freezing 🥶') {
    return styles.freezing;
  }
  return styles.coldToFreezing;
};

export const defaultAppBarStyle = styles.coldToFreezing;

export default getAppBarStyle;
