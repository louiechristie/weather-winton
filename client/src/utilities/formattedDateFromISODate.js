import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';

// Load plugin
dayjs.extend(calendar);

export default function formattedDateFromISODate(ISODate) {
  return dayjs(ISODate).calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'DD/MM/YYYY'
  });
}
