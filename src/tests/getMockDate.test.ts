import getMockDate from './getMockDate';
import { Temporal } from 'temporal-polyfill';

describe('getMockDate', () => {
  test('getMockDate to be beginning hour to input time', () => {
    const res = getMockDate('2025-12-29T12:44Z');
    const expected = '2025-12-29T11:00Z';

    expect(res).toEqual(expected);
  });

  describe('getMockDate series', () => {
    let now: typeof Temporal.Now;
    let nowInstant: Temporal.Instant;
    let nowStringISO8601: string;
    let nowZonedDateTime: Temporal.ZonedDateTime;
    let timeZoneId: string;

    beforeEach(() => {
      now = Temporal.Now;
      timeZoneId = 'UTC';
      nowInstant = now.instant();
      nowZonedDateTime = nowInstant.toZonedDateTimeISO(timeZoneId);
      nowStringISO8601 = nowZonedDateTime.toString({
        timeZoneName: 'never',
        offset: 'never',
      });
    });

    test('getMockDate on first instant to be beginning of previous hour', () => {
      const expectedFirstMockDateZonedDateTime = nowZonedDateTime
        .with({
          minute: 0,
          second: 0,
          millisecond: 0,
        })
        .subtract({
          hours: 1,
        });
      const firstMockDate = getMockDate(nowStringISO8601);
      const firstMockDateZonedDateTime =
        Temporal.Instant.from(firstMockDate).toZonedDateTimeISO(timeZoneId);

      expect(
        Temporal.ZonedDateTime.compare(
          expectedFirstMockDateZonedDateTime,
          firstMockDateZonedDateTime
        )
      ).toEqual(0);
    });

    test('getMockDate second time to be beginning of hour', () => {
      const expectedSecondTimeZonedDateTime = nowZonedDateTime.with({
        minute: 0,
        second: 0,
        millisecond: 0,
      });

      getMockDate(nowStringISO8601);

      const hourLaterZonedDateTime =
        Temporal.Instant.from(getMockDate()).toZonedDateTimeISO(timeZoneId);

      expect(
        Temporal.ZonedDateTime.compare(
          expectedSecondTimeZonedDateTime,
          hourLaterZonedDateTime
        )
      ).toEqual(0);
    });

    test('getMockDate third time to be beginning of next hour', () => {
      const expectedThirdTimeZonedDateTime = nowZonedDateTime
        .with({
          minute: 0,
          second: 0,
          millisecond: 0,
        })
        .add({ hours: 1 });

      getMockDate(nowStringISO8601);
      getMockDate();

      const thirdTimeZonedDateTime =
        Temporal.Instant.from(getMockDate()).toZonedDateTimeISO(timeZoneId);

      expect(
        Temporal.ZonedDateTime.compare(
          expectedThirdTimeZonedDateTime,
          thirdTimeZonedDateTime
        )
      ).toEqual(0);
    });
  });
});
