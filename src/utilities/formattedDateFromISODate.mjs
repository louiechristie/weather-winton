import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar.js';

// Load plugin
dayjs.extend(calendar);

export default function formattedDateFromISODate(ISODate) {
  const theDate = dayjs(ISODate);

  if (!theDate.isValid()) {
    console.error('Invalid date');
    throw new Error('Invalid date');
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
