import { Temporal } from 'temporal-polyfill';

const DEBUG = false;

const getIsFullishMoon = (date: Temporal.ZonedDateTime): boolean => {
  const dateString = date.toString();
  if (DEBUG) {
    console.log('getIsFullMoon called with date:', dateString);
  }
  const chineseCalendarDate = date.withCalendar('chinese');
  const day = chineseCalendarDate.day;
  if (day < 15 + 4 && day > 15 - 4) {
    return true;
  }
  return false;
};

export { getIsFullishMoon };
