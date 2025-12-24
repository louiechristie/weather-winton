import getPancakeDayDate from '../utilities/getPancakeDayDate.mjs';

// Dates from https://en.wikipedia.org/wiki/Shrove_Tuesday

describe('getPancakeDayDate', () => {
  test('Get pancake day date 2026', async () => {
    const pancakeDayDate = await getPancakeDayDate(2026);

    expect(pancakeDayDate).toEqual('17-02-2026');
  });
});
