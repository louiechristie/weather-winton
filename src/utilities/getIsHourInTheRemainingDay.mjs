import { Temporal } from 'temporal-polyfill';

const DEBUG = false;

export const getIsHourInTheRemainingDay = (
  time,
  currentTime = Temporal.Now.instant().toString()
) => {
  const systemTimeZone = Temporal.Now.timeZoneId();
  const instantTime = Temporal.Instant.from(time);
  const instantCurrentTime = Temporal.Instant.from(currentTime);
  const zonedDateTime = instantTime.toZonedDateTimeISO(systemTimeZone);
  const currentZonedDateTime =
    instantCurrentTime.toZonedDateTimeISO(systemTimeZone);
  const currentHourZonedDateTime = currentZonedDateTime.with({
    minute: 0,
    second: 0,
    microsecond: 0,
  });
  const hourZonedDateTime = zonedDateTime.with({
    minute: 0,
    second: 0,
    microsecond: 0,
  });

  const isSameDay = zonedDateTime
    .toPlainDate()
    .equals(currentZonedDateTime.toPlainDate());

  const isBeforeMidnight =
    currentHourZonedDateTime.hour < 23 ||
    (currentHourZonedDateTime.hour === 23 &&
      currentHourZonedDateTime.minute < 59);

  if (DEBUG) {
    const instantTimeString = instantTime.toString();
    const instantCurrentTimeString = instantCurrentTime.toString();
    const hourZonedDateTimeString = hourZonedDateTime.toString();

    const currentHourZonedDateTimeString = currentHourZonedDateTime.toString();
    const currentZonedDateTimeString = currentZonedDateTime.toString();
    const zonedDateTimeString = zonedDateTime.toString();

    console.info({
      systemTimeZone,
      instantTimeString,
      instantCurrentTimeString,
      zonedDateTimeString,
      currentZonedDateTimeString,
      currentHourZonedDateTimeString,
      hourZonedDateTimeString,
    });
  }

  const comparison = Temporal.ZonedDateTime.compare(
    currentHourZonedDateTime,
    hourZonedDateTime
  );

  const isCurrentHour = comparison === 0;

  const isLater =
    Temporal.ZonedDateTime.compare(currentZonedDateTime, zonedDateTime) < 0;

  const isCurrentHourOrLater = isCurrentHour || isLater;

  const isTodayAndRemaining =
    isSameDay && isCurrentHourOrLater && isBeforeMidnight;

  return isTodayAndRemaining;
};
