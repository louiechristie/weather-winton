import getComfortFromRelativeHumidity from './getComfortFromRelativeHumidity.mjs';

test('0% relative humidity to equal "TOO_DRY"', () => {
  expect(getComfortFromRelativeHumidity(0)).toBe('TOO_DRY');
});

test('24% relative humidity to equal "TOO_DRY"', () => {
  expect(getComfortFromRelativeHumidity(24)).toBe('TOO_DRY');
});

test('25% relative humidity to equal "COMFORTABLE"', () => {
  expect(getComfortFromRelativeHumidity(25)).toBe('COMFORTABLE');
});

test('40% relative humidity to equal "COMFORTABLE"', () => {
  expect(getComfortFromRelativeHumidity(40)).toBe('COMFORTABLE');
});

test('50% relative humidity to equal "COMFORTABLE"', () => {
  expect(getComfortFromRelativeHumidity(50)).toBe('COMFORTABLE');
});

test('51% relative humidity to equal "TOO_HUMID"', () => {
  expect(getComfortFromRelativeHumidity(51)).toBe('TOO_HUMID');
});

test('100% relative humidity to equal "TOO_HUMID"', () => {
  expect(getComfortFromRelativeHumidity(100)).toBe('TOO_HUMID');
});

test('-1% relative humidity to equal null', () => {
  expect(getComfortFromRelativeHumidity(-1)).toBe(null);
});

test('101% relative humidity to equal null', () => {
  expect(getComfortFromRelativeHumidity(101)).toBe(null);
});

test('"string" relative humidity to equal null', () => {
  expect(getComfortFromRelativeHumidity('string')).toBe(null);
});

test('[object] relative humidity to equal null', () => {
  expect(getComfortFromRelativeHumidity({})).toBe(null);
});
