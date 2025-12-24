import getPancakeDayDate from './getPancakeDay';

// Dates from https://en.wikipedia.org/wiki/Shrove_Tuesday

describe('getPancakeDayDate', () => {
  test('Get pancake day date 2025', () => {
    const pancakeDayDate = getPancakeDayDate(2025);
    expect(pancakeDayDate.toString()).toEqual('2025-03-04');
  });

  test('Get pancake day date 2026', () => {
    const pancakeDayDate = getPancakeDayDate(2026);
    expect(pancakeDayDate.toString()).toEqual('2026-02-17');
  });

  test('Get pancake day date 2027', () => {
    const pancakeDayDate = getPancakeDayDate(2027);
    expect(pancakeDayDate.toString()).toEqual('2027-02-09');
  });
});
