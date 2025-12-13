import { Temporal } from 'temporal-polyfill';

type StormEntry = {
  name: string;
  dateRaw?: string;
  start?: string | null;
  end?: string | null;
};

const getStormName = (
  date: Temporal.Instant,
  isWindy: boolean,
  isTakeRaincoat: boolean,
  storms: StormEntry[] = []
) => {
  if (!(isWindy || isTakeRaincoat)) return null;

  for (const s of storms) {
    if (!s.start || !s.end) continue;
    try {
      const startInstant = Temporal.Instant.from(s.start);
      const endInstant = Temporal.Instant.from(s.end);
      if (
        date.epochMilliseconds >= startInstant.epochMilliseconds &&
        date.epochMilliseconds < endInstant.epochMilliseconds
      ) {
        return s.name;
      }
    } catch (e) {
      continue;
    }
  }
  return null;
};

export default getStormName;
