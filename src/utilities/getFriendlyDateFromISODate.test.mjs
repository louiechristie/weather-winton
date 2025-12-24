import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

import getFriendlyDateFromISODate from './getFriendlyDateFromISODate';
import getSpecialDates from './getSpecialDates.ts';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/London');
dayjs.extend(customParseFormat);

describe('get friendly dates', () => {
  let specialDates;

  beforeAll(async () => {
    specialDates = await getSpecialDates();
  }, 15000);

  test('Christmas', () => {
    expect(
      getFriendlyDateFromISODate(
        dayjs()
          .month(12 - 1)
          .date(25)
          .startOf('day'),
        specialDates
      )
    ).toBe('Christmas 🎄');
  });

  test("New Year's Eve 🎉", () => {
    expect(
      getFriendlyDateFromISODate(
        dayjs()
          .month(12 - 1)
          .date(31)
          .startOf('day'),
        specialDates
      )
    ).toBe("New Year's Eve 🎉");
  });

  test('New Year’s Day', () => {
    expect(
      getFriendlyDateFromISODate(
        dayjs()
          .month(1 - 1)
          .date(1)
          .startOf('day'),
        specialDates
      )
    ).toBe('New Year’s Day');
  });

  test('Valentines Day ❤️', () => {
    expect(
      getFriendlyDateFromISODate(
        dayjs()
          .month(2 - 1)
          .date(14)
          .startOf('day'),
        specialDates,
        specialDates
      )
    ).toBe('Valentines Day ❤️');
  });

  test('Pancake Day 🥞', () => {
    const pancakeDayDate = dayjs('17-02-2026', 'DD-MM-YYYY');

    expect(getFriendlyDateFromISODate(pancakeDayDate, specialDates)).toBe(
      'Pancake Day 🥞'
    );
  });
});
