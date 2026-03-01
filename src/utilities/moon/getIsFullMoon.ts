import { Temporal } from 'temporal-polyfill';

const getIsFullMoon = (date: Temporal.PlainDate): boolean => {
  if (
    Temporal.PlainDate.compare(date, Temporal.PlainDate.from('2026-03-03')) ===
    0
  ) {
    return true;
  }
  return false;
};

export { getIsFullMoon };
