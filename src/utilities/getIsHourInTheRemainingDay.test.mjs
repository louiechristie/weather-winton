import { getIsHourInTheRemainingDay } from './metOfficeWeatherUtils.mjs';

test('1200 is after 0800', () => {
  expect(
    getIsHourInTheRemainingDay(
      '2024-06-07T12:00:00+0100',
      '2024-06-07T08:00:00+0100'
    )
  ).toBe(true);
});

test('0200 is after 0000', () => {
  expect(
    getIsHourInTheRemainingDay(
      '2024-06-07T02:00:00+0100',
      '2024-06-07T00:00:00+0100'
    )
  ).toBe(true);
});

test('0300 is after 0100', () => {
  expect(
    getIsHourInTheRemainingDay(
      '2024-06-07T03:00:00+0100',
      '2024-06-07T01:00:00+0100'
    )
  ).toBe(true);
});

test('0100 is after 0000', () => {
  expect(
    getIsHourInTheRemainingDay(
      '2024-06-07T01:00:00+0100',
      '2024-06-07T00:00:00+0100'
    )
  ).toBe(true);
});

test('time is current time', () => {
  expect(
    expect(
      getIsHourInTheRemainingDay(
        '2024-06-07T01:00:00+0100',
        '2024-06-07T01:00:00+0100'
      )
    ).toBe(true)
  );
});

test('one second after current time', () => {
  expect(
    getIsHourInTheRemainingDay(
      '2024-06-07T00:00:01+0100',
      '2024-06-07T00:00:00+0100'
    )
  ).toBe(true);
});

test('one hour after current time', () => {
  expect(
    getIsHourInTheRemainingDay(
      '2024-06-07T00:01:00+0100',
      '2024-06-07T00:00:00+0100'
    )
  ).toBe(true);
});

test('0059 is after 0000', () => {
  expect(
    getIsHourInTheRemainingDay(
      '2024-06-07T00:59:00+0100',
      '2024-06-07T00:00:00+0100'
    )
  ).toBe(true);
});

test('00:59:59 is after 0000', () => {
  expect(
    getIsHourInTheRemainingDay(
      '2024-06-07T00:59:59+0100',
      '2024-06-07T00:00:00+0100'
    )
  ).toBe(true);
});

test('next day', () => {
  expect(
    getIsHourInTheRemainingDay(
      '2024-06-08T00:00:00+0100',
      '2024-06-07T00:00:00+0100'
    )
  ).toBe(false);
});

test('one second before current time', () => {
  expect(
    getIsHourInTheRemainingDay(
      '2024-06-06T23:59:59+0100',
      '2024-06-07T00:00:01+0100'
    )
  ).toBe(false);
});

test('one hour before current time', () => {
  expect(
    getIsHourInTheRemainingDay(
      '2024-06-06T23:00:01+0100',
      '2024-06-07T00:00:01+0100'
    )
  ).toBe(false);
});
