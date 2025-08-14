import getSpecialDates from '../utilities/getSpecialDates.ts';
import generateSpecialDatesMetOfficeJSON from './generateSpecialDatesMetOfficeJSON';

test('Once forecast per special date', async () => {
  const specialDates = await getSpecialDates();
  const specialDatesLength = specialDates.length;
  const generatedSpecialDatesMetOfficeJSON =
    await generateSpecialDatesMetOfficeJSON(specialDates);
  const generatedSpecialDatesMetOfficeJSONLength =
    generatedSpecialDatesMetOfficeJSON.features[0].properties.timeSeries.length;
  expect(generatedSpecialDatesMetOfficeJSONLength).toEqual(specialDatesLength);
});
