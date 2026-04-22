import { Temporal } from 'temporal-polyfill';
import { getIsHourInTheRemainingDay } from './getIsHourInTheRemainingDay';

test('1200 is after 0800', () => {
  expect(
    getIsHourInTheRemainingDay(
      Temporal.Instant.from('2024-06-07T12:00:00+0100'),
      Temporal.Instant.from('2024-06-07T08:00:00+0100')
    )
  ).toBe(true);
});

test('0200 is after 0000', () => {
  expect(
    getIsHourInTheRemainingDay(
      Temporal.Instant.from('2024-06-07T02:00:00+0100'),
      Temporal.Instant.from('2024-06-07T00:00:00+0100')
    )
  ).toBe(true);
});

test('0300 is after 0100', () => {
  expect(
    getIsHourInTheRemainingDay(
      Temporal.Instant.from('2024-06-07T03:00:00+0100'),
      Temporal.Instant.from('2024-06-07T01:00:00+0100')
    )
  ).toBe(true);
});

test('0100 is after 0000', () => {
  expect(
    getIsHourInTheRemainingDay(
      Temporal.Instant.from('2024-06-07T01:00:00+0100'),
      Temporal.Instant.from('2024-06-07T00:00:00+0100')
    )
  ).toBe(true);
});

test('2300 is after 2200', () => {
  expect(
    getIsHourInTheRemainingDay(
      Temporal.Instant.from('2024-06-07T23:00:00+0100'),
      Temporal.Instant.from('2024-06-07T22:00:00+0100')
    )
  ).toBe(true);
});

test('2300 is after 22:47', () => {
  expect(
    getIsHourInTheRemainingDay(
      Temporal.Instant.from('2026-04-21T23:00:00+0100'),
      Temporal.Instant.from('2026-04-21T22:47:53.225+0100')
    )
  ).toBe(true);
});

test('time is current time', () => {
  expect(
    expect(
      getIsHourInTheRemainingDay(
        Temporal.Instant.from('2024-06-07T01:00:00+0100'),
        Temporal.Instant.from('2024-06-07T01:00:00+0100')
      )
    ).toBe(true)
  );
});

test('one second after current time', () => {
  expect(
    getIsHourInTheRemainingDay(
      Temporal.Instant.from('2024-06-07T00:00:01+0100'),
      Temporal.Instant.from('2024-06-07T00:00:00+0100')
    )
  ).toBe(true);
});

test('one hour after current time', () => {
  expect(
    getIsHourInTheRemainingDay(
      Temporal.Instant.from('2024-06-07T00:01:00+0100'),
      Temporal.Instant.from('2024-06-07T00:00:00+0100')
    )
  ).toBe(true);
});

test('0059 is after 0000', () => {
  expect(
    getIsHourInTheRemainingDay(
      Temporal.Instant.from('2024-06-07T00:59:00+0100'),
      Temporal.Instant.from('2024-06-07T00:00:00+0100')
    )
  ).toBe(true);
});

test('00:59:59 is after 0000', () => {
  expect(
    getIsHourInTheRemainingDay(
      Temporal.Instant.from('2024-06-07T00:59:59+0100'),
      Temporal.Instant.from('2024-06-07T00:00:00+0100')
    )
  ).toBe(true);
});

test('next day', () => {
  expect(
    getIsHourInTheRemainingDay(
      Temporal.Instant.from('2024-06-08T00:00:00+0100'),
      Temporal.Instant.from('2024-06-07T00:00:00+0100')
    )
  ).toBe(false);
});

test('one second before current time', () => {
  expect(
    getIsHourInTheRemainingDay(
      Temporal.Instant.from('2024-06-06T23:59:59+0100'),
      Temporal.Instant.from('2024-06-07T00:00:01+0100')
    )
  ).toBe(false);
});

test('one hour before current time', () => {
  expect(
    getIsHourInTheRemainingDay(
      Temporal.Instant.from('2024-06-06T23:00:01+0100'),
      Temporal.Instant.from('2024-06-07T00:00:01+0100')
    )
  ).toBe(false);
});

test('one day after current day', () => {
  expect(
    getIsHourInTheRemainingDay(
      Temporal.Instant.from('2024-06-12T23:00Z'),
      Temporal.Instant.from('2024-06-11T23:00Z')
    )
  ).toBe(false);
});

test('one second before current day', () => {
  expect(
    getIsHourInTheRemainingDay(
      Temporal.Instant.from('2024-06-11T23:59:59+0100'),
      Temporal.Instant.from('2024-06-12T00:00:00+0100')
    )
  ).toBe(false);
});

test('one minute before current day', () => {
  expect(
    getIsHourInTheRemainingDay(
      Temporal.Instant.from('2024-06-11T23:59:00+0100'),
      Temporal.Instant.from('2024-06-12T00:00:00+0100')
    )
  ).toBe(false);
});

test('one hour before end of day', () => {
  expect(
    getIsHourInTheRemainingDay(
      Temporal.Instant.from('2024-06-12T23:00Z'),
      Temporal.Instant.from('2024-06-12T23:00Z')
    )
  ).toBe(true);
});

test('one second before end of day', () => {
  expect(
    getIsHourInTheRemainingDay(
      Temporal.Instant.from('2025-12-30T23:00Z'),
      Temporal.Instant.from('2025-12-30T23:59:59Z')
    )
  ).toBe(true);
});

test('one second before end of day summer', () => {
  expect(
    getIsHourInTheRemainingDay(
      Temporal.Instant.from('2024-06-12T23:00Z'),
      Temporal.Instant.from('2024-06-12T23:59:59Z')
    )
  ).toBe(true);
});

test('one minute before end of day', () => {
  expect(
    getIsHourInTheRemainingDay(
      Temporal.Instant.from('2024-06-12T23:00Z'),
      Temporal.Instant.from('2024-06-12T23:59:00Z')
    )
  ).toBe(true);
});
