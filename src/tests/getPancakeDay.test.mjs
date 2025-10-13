import getPancakeDayDate from '../utilities/getPancakeDayDate.mjs';

test('Get pancake day date', async () => {
  const pancakeDayDate = await getPancakeDayDate();

  expect(pancakeDayDate).toEqual('17-02-2026');
});
