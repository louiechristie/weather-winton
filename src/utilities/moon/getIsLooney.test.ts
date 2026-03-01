import { Temporal } from 'temporal-polyfill';
import { getIsLooney } from './getIsLooney';

describe('getIsLooney', () => {
  it('should return true for Saturday 28 February 2026 because the audience were looney at Punchdrunk theatre', () => {
    const date = Temporal.ZonedDateTime.from('2026-02-28T19:00:00Z[UTC]');
    expect(getIsLooney(date)).toBe(true);
  });

  it("should return false for Thursday 26 February 2026 because the audience weren't looney", () => {
    const date = Temporal.ZonedDateTime.from('2026-02-26T19:00:00Z[UTC]');
    expect(getIsLooney(date)).toBe(false);
  });

  it('should return false for Sunday 1 March 2026 because not a fri/sat night', () => {
    const date = Temporal.ZonedDateTime.from('2026-03-01T19:00:00Z[UTC]');
    expect(getIsLooney(date)).toBe(false);
  });
});
