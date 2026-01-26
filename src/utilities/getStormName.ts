import { Temporal } from 'temporal-polyfill';

const getStormName = (
  date: Temporal.Instant,
  isWindy: boolean,
  isTakeRaincoat: boolean
) => {
  let isBefore =
    date.epochMilliseconds <
    Temporal.Instant.from('2025-12-08T00+00:00[Europe/London]')
      .epochMilliseconds;
  let isAfter =
    date.epochMilliseconds >=
    Temporal.Instant.from('2025-12-12T00+00:00[Europe/London]')
      .epochMilliseconds;

  if (!isBefore && !isAfter && (isWindy || isTakeRaincoat)) {
    return 'Bram';
  }

  isBefore =
    date.epochMilliseconds <
    Temporal.Instant.from('2025-12-31T00+00:00[Europe/London]')
      .epochMilliseconds;
  isAfter =
    date.epochMilliseconds >=
    Temporal.Instant.from('2026-01-11T00+00:00[Europe/London]')
      .epochMilliseconds;

  if (!isBefore && !isAfter && (isWindy || isTakeRaincoat)) {
    return 'Goretti';
  }

  let stormStartDate = Temporal.Instant.from(
    '2026-01-20T00+00:00[Europe/London]'
  );
  let stormEndDate = Temporal.Instant.from(
    '2026-01-26T00+00:00[Europe/London]'
  );

  let dateIsAfterStormStart =
    date.epochMilliseconds >= stormStartDate.epochMilliseconds;
  let dateIsBeforeStormEnd =
    date.epochMilliseconds < stormEndDate.epochMilliseconds;

  if (
    dateIsAfterStormStart &&
    dateIsBeforeStormEnd &&
    (isWindy || isTakeRaincoat)
  ) {
    return 'Ingrid';
  }

  stormStartDate = Temporal.Instant.from('2026-01-26T00+00:00[Europe/London]');
  stormEndDate = Temporal.Instant.from('2026-01-28T00+00:00[Europe/London]');

  dateIsAfterStormStart =
    date.epochMilliseconds >= stormStartDate.epochMilliseconds;
  dateIsBeforeStormEnd =
    date.epochMilliseconds < stormEndDate.epochMilliseconds;

  if (
    dateIsAfterStormStart &&
    dateIsBeforeStormEnd &&
    (isWindy || isTakeRaincoat)
  ) {
    return 'Chandra';
  }

  return null;
};

export default getStormName;
