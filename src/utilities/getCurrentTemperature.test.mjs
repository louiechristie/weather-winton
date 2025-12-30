import getCurrentTemperature from './getCurrentTemperature';
import hourly from '../tests/hourly.json' with { type: 'json' };
test('getCurrentTemperature', () => {
  expect(getCurrentTemperature(hourly, '2024-06-08T08:00Z')).toBe(13.49);
});
