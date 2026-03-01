import { Temporal } from 'temporal-polyfill';
import { getIsFullMoon } from './getIsFullMoon';

describe('getIsFullMoon', () => {
  it('should return true for a full moon date', () => {
    // 3 March https://www.rmg.co.uk/stories/space-astronomy/full-moon-calendar-2026
    const fullMoonDate = Temporal.PlainDate.from('2026-03-03');
    expect(getIsFullMoon(fullMoonDate)).toBe(true);
  });

  it('should return false for a non-full moon date', () => {
    // 1 March https://www.rmg.co.uk/stories/space-astronomy/full-moon-calendar-2026
    const nonFullMoonDate = Temporal.PlainDate.from('2026-03-01');
    expect(getIsFullMoon(nonFullMoonDate)).toBe(false);
  });
});
