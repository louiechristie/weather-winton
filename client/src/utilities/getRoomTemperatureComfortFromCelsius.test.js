import getRoomTemperatureComfortFromCelsius from './getRoomTemperatureComfortFromCelsius';

test('0 celsius to equal "TOO_COLD"', () => {
  expect(getRoomTemperatureComfortFromCelsius(0)).toBe('TOO_COLD');
});

test('15.9 celsius to equal "TOO_COLD"', () => {
  expect(getRoomTemperatureComfortFromCelsius(15.9)).toBe('TOO_COLD');
});

test('16 celsius to equal "COMFORTABLE"', () => {
  expect(getRoomTemperatureComfortFromCelsius(16)).toBe('COMFORTABLE');
});

test('21 celsius to equal "COMFORTABLE"', () => {
  expect(getRoomTemperatureComfortFromCelsius(21)).toBe('COMFORTABLE');
});

test('24 celsius to equal "COMFORTABLE"', () => {
  expect(getRoomTemperatureComfortFromCelsius(24)).toBe('COMFORTABLE');
});

test('24.1 celsius to equal "TOO_HOT"', () => {
  expect(getRoomTemperatureComfortFromCelsius(51)).toBe('TOO_HOT');
});

test('100 celsius to equal "TOO_HOT"', () => {
  expect(getRoomTemperatureComfortFromCelsius(100)).toBe('TOO_HOT');
});

test('"string" celsius to equal null', () => {
  expect(getRoomTemperatureComfortFromCelsius('string')).toBe(null);
});

test('[object] celsius to equal null', () => {
  expect(getRoomTemperatureComfortFromCelsius({})).toBe(null);
});
