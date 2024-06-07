import getFriendlyDateFromISODate from './getFriendlyDateFromISODate.mjs';

test('Christmas', () => {
  expect(getFriendlyDateFromISODate('2024-12-25T14:59:43+0000')).toBe(
    'Christmas'
  );
});

test("New Year's Eve 🎉", () => {
  expect(getFriendlyDateFromISODate('2024-12-31T14:59:43+0000')).toBe(
    "New Year's Eve 🎉"
  );
});

test("New Year's Day", () => {
  expect(getFriendlyDateFromISODate('2024-01-01T14:59:43+0000')).toBe(
    "New Year's Day"
  );
});

test('Valentines Day ❤️', () => {
  expect(getFriendlyDateFromISODate('2024-02-14T14:59:43+0000')).toBe(
    'Valentines Day ❤️'
  );
});
