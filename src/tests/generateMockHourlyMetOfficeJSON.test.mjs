import generateMockHourlyMetOfficeJSON from './generateMockHourlyMetOfficeJSON.mjs';
import hourly from './hourly.json' with { type: 'json' };

test('regenerate hourly.json file exactly', () => {
  expect(generateMockHourlyMetOfficeJSON()).toEqual(hourly);
});
