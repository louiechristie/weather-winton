import getIsStickyFromCelsiusAndRelativeHumidity from './getIsStickyFromCelsiusAndRelativeHumidity';

test('is sticky', () => {
  expect(getIsStickyFromCelsiusAndRelativeHumidity(24, 60)).toBe(true);
});

test('not sticky', () => {
  expect(getIsStickyFromCelsiusAndRelativeHumidity(24, 55)).toBe(false);
});
