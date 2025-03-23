import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar.js';

// Load plugin
dayjs.extend(calendar);

export default function getFriendlyDateFromISODate(ISODate, specialDates) {
  const theDate = dayjs(ISODate);

  if (!theDate.isValid()) {
    throw new Error('Invalid date');
  }

  if (specialDates) {
    let isSpecialDate = false;
    let name;
    specialDates.forEach((specialDate) => {
      if (theDate.isSame(specialDate.date, 'day')) {
        isSpecialDate = true;
        name = specialDate.name;
      }
    });
    if (isSpecialDate) return name;
  }

  return theDate.calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'DD/MM/YYYY',
  });
}
