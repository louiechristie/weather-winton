import { Temporal } from 'temporal-polyfill';

export const getIsHourInTheRemainingDay = (
  hour: Temporal.Instant,
  currentTime: Temporal.Instant
) => {
  const systemTimeZone = Temporal.Now.timeZoneId();

  const zonedHour = hour.toZonedDateTimeISO(systemTimeZone);
  const date = zonedHour.toPlainDate();

  const currentTimeZoned = currentTime.toZonedDateTimeISO(systemTimeZone);
  const currentHourZoned = currentTimeZoned.with({
    minute: 0,
    second: 0,
    microsecond: 0,
  });
  const currentDate = currentHourZoned.toPlainDate();

  const isSameDay = date.equals(currentDate);

  const comparison = Temporal.ZonedDateTime.compare(
    currentHourZoned,
    zonedHour
  );

  const isCurrentHour = comparison === 0;

  const isLater = comparison < 0;

  const isCurrentHourOrLater = isCurrentHour || isLater;

  const isTodayBeforeMidnight = isSameDay && isCurrentHourOrLater;

  const isTodayAndRemaining = isTodayBeforeMidnight;

  return isTodayAndRemaining;
};
