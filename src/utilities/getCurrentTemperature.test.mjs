import getCurrentTemperature from './getCurrentTemperature.mjs';
import hourly from '../tests/hourly.json' assert { type: 'json' };
test('getCurrentTemperature', () => {
  expect(getCurrentTemperature(hourly, '2024-06-08T08:00Z')).toBe(13.49);
});
