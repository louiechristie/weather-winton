import getPancakeDayDate from '../utilities/getPancakeDayDate.mjs';

test('Get pancake day 1600', async () => {
  const pancakeDayDate = await getPancakeDayDate();

  expect(pancakeDayDate).toEqual('17-02-2026');
});
