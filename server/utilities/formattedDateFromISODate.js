const dayjs = require('dayjs');
const calendar = require('dayjs/plugin/calendar');

// Load plugin
dayjs.extend(calendar);

function formattedDateFromISODate(ISODate) {
  return dayjs(ISODate).calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'DD/MM/YYYY'
  });
}

module.exports = formattedDateFromISODate;
