import { Temporal } from 'temporal-polyfill';
import { getIsFullishMoon } from './getIsFullishMoon';

const getIsLooney = (date: Temporal.ZonedDateTime): boolean => {
  const isFullishMoon = getIsFullishMoon(date);
  const isWeekendVibes = date.dayOfWeek === 5 || date.dayOfWeek === 6;
  return isFullishMoon && isWeekendVibes;
};

export { getIsLooney };
