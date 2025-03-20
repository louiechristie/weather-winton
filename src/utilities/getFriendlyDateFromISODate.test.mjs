import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

import getFriendlyDateFromISODate from './getFriendlyDateFromISODate.mjs';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/London');
dayjs.extend(customParseFormat);

test('Christmas', () => {
  expect(getFriendlyDateFromISODate('2024-12-25T14:59:43+0000')).toBe(
    'Christmas'
  );
});

test("New Year's Eve 🎉", () => {
  expect(getFriendlyDateFromISODate('2024-12-31T14:59:43+0000')).toBe(
    "New Year's Eve 🎉"
  );
});

test("New Year's Day", () => {
  expect(getFriendlyDateFromISODate('2024-01-01T14:59:43+0000')).toBe(
    "New Year's Day"
  );
});

test('Valentines Day ❤️', () => {
  expect(getFriendlyDateFromISODate('2024-02-14T14:59:43+0000')).toBe(
    'Valentines Day ❤️'
  );
});

test('Pancake Day 🥞', () => {
  const pancakeDayDate = dayjs('26-02-2026', 'DD-MM-YYYY');
  const specialDates = [{ date: pancakeDayDate, name: 'Pancake Day 🥞' }];

  expect(getFriendlyDateFromISODate(pancakeDayDate, specialDates)).toBe(
    'Pancake Day 🥞'
  );
});
