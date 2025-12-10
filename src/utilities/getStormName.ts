import { Temporal } from 'temporal-polyfill';

const getStormName = (date: Temporal.Instant, isWindy: boolean) => {
  const isBefore =
    date.epochMilliseconds <
    Temporal.Instant.from('2025-12-08T00+00:00[Europe/London]')
      .epochMilliseconds;
  const isAfter =
    date.epochMilliseconds >=
    Temporal.Instant.from('2025-12-12T00+00:00[Europe/London]')
      .epochMilliseconds;

  if (!isBefore && !isAfter && isWindy) {
    return 'Bram';
  }
  return null;
};

export default getStormName;
