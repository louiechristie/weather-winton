import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar.js';

// Load plugin
dayjs.extend(calendar);

export default function getFriendlyDateFromISODate(ISODate) {
  const theDate = dayjs(ISODate);

  switch (true) {
    case !theDate.isValid():
      throw new Error('Invalid date');
    case dayjs(ISODate).month() === 11 /* in days months are zero indexed */ &&
      dayjs(ISODate).date() === 25:
      return 'Christmas';
    case dayjs(ISODate).month() === 11 /* in days months are zero indexed */ &&
      dayjs(ISODate).date() === 31:
      return "New Year's Eve 🎉";
    case dayjs(ISODate).month() === 0 /* in days months are zero indexed */ &&
      dayjs(ISODate).date() === 1:
      return "New Year's Day";
    case dayjs(ISODate).month() === 1 /* in days months are zero indexed */ &&
      dayjs(ISODate).date() === 14:
      return 'Valentines Day ❤️';
    default:
      return theDate.calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'DD/MM/YYYY',
      });
  }
}
