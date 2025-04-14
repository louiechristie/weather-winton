import getSpecialDates from '../utilities/getSpecialDates.mjs';
import generateSpecialDatesMetOfficeJSON from './generateSpecialDatesMetOfficeJSON.mjs';

test('Once forecast per special date', async () => {
  const specialDates = await getSpecialDates();
  const specialDatesLength = specialDates.length;
  const generatedSpecialDatesMetOfficeJSON =
    await generateSpecialDatesMetOfficeJSON(specialDates);
  const generatedSpecialDatesMetOfficeJSONLength =
    generatedSpecialDatesMetOfficeJSON.features[0].properties.timeSeries.length;
  expect(generatedSpecialDatesMetOfficeJSONLength).toEqual(specialDatesLength);
});
