import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

import getFriendlyDateFromISODate from './getFriendlyDateFromISODate';
import getSpecialDates from './getSpecialDates';

import SpecialDate from '@/types/specialDate';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/London');
dayjs.extend(customParseFormat);

describe('get friendly dates', () => {
  let specialDates: SpecialDate[];

  beforeAll(async () => {
    specialDates = await getSpecialDates();
  }, 15000);

  test('Christmas', () => {
    const date = dayjs()
      .month(12 - 1)
      .date(25)
      .startOf('day');
    const ISODate = date.toISOString();
    expect(getFriendlyDateFromISODate(ISODate, specialDates)).toBe(
      'Christmas 🎄'
    );
  });

  test("New Year's Eve 🎉", () => {
    const date = dayjs()
      .month(12 - 1)
      .date(31)
      .startOf('day');
    const ISODate = date.toISOString();
    expect(getFriendlyDateFromISODate(ISODate, specialDates)).toBe(
      "New Year's Eve 🎉"
    );
  });

  test('New Year’s Day', () => {
    const date = dayjs()
      .month(1 - 1)
      .date(1)
      .startOf('day');
    const ISODate = date.toISOString();
    expect(getFriendlyDateFromISODate(ISODate, specialDates)).toBe(
      'New Year’s Day'
    );
  });

  test('Valentines Day ❤️', () => {
    const date = dayjs()
      .month(2 - 1)
      .date(14)
      .startOf('day');

    const ISODate = date.toISOString();
    expect(getFriendlyDateFromISODate(ISODate, specialDates)).toBe(
      'Valentines Day ❤️'
    );
  });

  test('Pancake Day 🥞', () => {
    const pancakeDayDate = dayjs('17-02-2026', 'DD-MM-YYYY');

    const ISODate = pancakeDayDate.toISOString();

    expect(getFriendlyDateFromISODate(ISODate, specialDates)).toBe(
      'Pancake Day 🥞'
    );
  });
});
