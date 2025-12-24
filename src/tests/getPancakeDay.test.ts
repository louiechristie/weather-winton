import getPancakeDayDate from '../utilities/getPancakeDayDate.mjs';

// Dates from https://en.wikipedia.org/wiki/Shrove_Tuesday

describe('getPancakeDayDate', () => {
  test('Get pancake day date 2025', async () => {
    const pancakeDayDate = await getPancakeDayDate(2025);
    expect(pancakeDayDate).toEqual('04-03-2025');
  });

  test('Get pancake day date 2026', async () => {
    const pancakeDayDate = await getPancakeDayDate(2026);
    expect(pancakeDayDate).toEqual('17-02-2026');
  });

  test('Get pancake day date 2027', async () => {
    const pancakeDayDate = await getPancakeDayDate(2027);
    expect(pancakeDayDate).toEqual('09-02-2027');
  });
});
