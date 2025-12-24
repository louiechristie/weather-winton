// From https://www.rmg.co.uk/stories/time/when-easter

import { Temporal } from 'temporal-polyfill';
import getEaster from './getEaster';

describe('getEaster', () => {
  // Dates from https://www.rmg.co.uk/stories/time/when-easter
  it('returns correct date for Easter in 2024', () => {
    const easter2024 = getEaster(2025);
    expect(easter2024.toString()).toEqual(`2025-04-20`);
  });

  it('returns correct date for Easter in 2026', () => {
    const easter2024 = getEaster(2026);
    expect(easter2024.toString()).toEqual(`2026-04-05`);
  });

  it('returns correct date for Easter in 2027', () => {
    const easter2024 = getEaster(2027);
    expect(easter2024.toString()).toEqual(`2027-03-28`);
  });

  it('returns correct date for Easter in 2028', () => {
    const easter2024 = getEaster(2028);
    expect(easter2024.toString()).toEqual(`2028-04-16`);
  });

  it('returns correct date for Easter in 2029', () => {
    const easter2024 = getEaster(2029);
    expect(easter2024.toString()).toEqual(`2029-04-01`);
  });
});
