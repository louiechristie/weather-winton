import { Temporal } from 'temporal-polyfill';
import { getIsFullishMoon } from './getIsFullishMoon';

describe('getIsFullishMoon', () => {
  it('should return true for a full moon date', () => {
    // 3 March https://www.rmg.co.uk/stories/space-astronomy/full-moon-calendar-2026
    const fullMoonDate = Temporal.ZonedDateTime.from(
      '2026-03-03T19:00:00Z[UTC]'
    );
    expect(getIsFullishMoon(fullMoonDate)).toBe(true);
  });

  it('should return false for a non-full moon date', () => {
    // 1 March https://www.rmg.co.uk/stories/space-astronomy/full-moon-calendar-2026
    const darkishMoonDate = Temporal.ZonedDateTime.from(
      '2026-02-15T19:00:00Z[UTC]'
    );
    expect(getIsFullishMoon(darkishMoonDate)).toBe(false);
  });

  const fullishMoonDates = [
    // '2026-01-03',
    // '2026-02-01',
    // '2026-03-03',
    // '2026-04-02',
    // '2026-05-01',
    // '2026-05-31',
    // '2026-06-30',
    // '2026-07-29',
    // '2026-08-28',
    // '2026-09-26',
    // '2026-10-26',
    // '2026-11-24',
    // '2026-12-24',
    // Blue moons https://www.rmg.co.uk/stories/space-astronomy/what-blue-moon-how-often-does-it-occur#:~:text=Traditionally%20the%20definition%20of%20a%20blue%20moon,an%20astronomical%20season%20containing%20four%20full%20moons.
    '2027-05-20',
    '2028-12-31',
    // Further in the future https://www.timeanddate.com/moon/phases/uk/london?year=2046
    '2046-01-22',
    '2046-05-20',
    '2046-12-13',
  ];

  fullishMoonDates.forEach((date) => {
    it(`should return true for full moon date ${date}`, () => {
      const fullMoonDate = Temporal.ZonedDateTime.from(
        date + 'T19:00:00Z[UTC]'
      );
      expect(getIsFullishMoon(fullMoonDate)).toBe(true);
    });
  });

  const darkishMoonDates: string[] = [
    '2025-12-29',
    '2026-01-08',
    '2026-03-09',
    '2026-02-26',
    '2026-12-15',
    '2026-06-15',
    '1970-01-01',
    '2000-01-01',
    '2100-01-01',
  ];

  darkishMoonDates.forEach((date) => {
    it(`should return false for non full moon date ${date}`, () => {
      const darkishMoonDate = Temporal.ZonedDateTime.from(
        date + 'T19:00:00Z[UTC]'
      );
      expect(getIsFullishMoon(darkishMoonDate)).toBe(false);
    });
  });
});
