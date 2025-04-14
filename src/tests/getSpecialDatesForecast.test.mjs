import { getSpecialDatesForecast } from '../utilities/getForecast.mjs';
import getSpecialDates from '../utilities/getSpecialDates.mjs';

test('Once forecast per special date', async () => {
  const specialDates = await getSpecialDates();
  const specialDatesLength = specialDates.length;
  const specialDatesForecast = await getSpecialDatesForecast(specialDates);
  const specialDatesForecastLength = specialDatesForecast.length;
  expect(specialDatesForecastLength).toEqual(specialDatesLength);
});
