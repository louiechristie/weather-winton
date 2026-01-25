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

  const stormStartDate = Temporal.Instant.from(
    '2026-01-20T00+00:00[Europe/London]'
  );
  const stormEndDate = Temporal.Instant.from(
    '2026-01-26T00+00:00[Europe/London]'
  );

  const dateIsAfterStormStart =
    date.epochMilliseconds >= stormStartDate.epochMilliseconds;
  const dateIsBeforeStormEnd =
    date.epochMilliseconds < stormEndDate.epochMilliseconds;

  if (
    dateIsAfterStormStart &&
    dateIsBeforeStormEnd &&
    (isWindy || isTakeRaincoat)
  ) {
    return 'Ingrid';
  }

  return null;
};

export default getStormName;
