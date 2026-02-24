import { Temporal } from 'temporal-polyfill';

import getEaster from './getEaster';

const getPancakeDayDate = (year: number = Temporal.Now.plainDateISO().year) => {
  const easter = getEaster(year);
  const duration = Temporal.Duration.from({ days: 47 });
  const pancakeDayDate = easter.subtract(duration);

  return pancakeDayDate;
};

export const getNextPancakeDayDate = () => {
  const thisYearPancakeDay = getPancakeDayDate(
    Temporal.Now.plainDateISO().year
  );
  const nextYearPancakeDay = getPancakeDayDate(
    Temporal.Now.plainDateISO().year + 1
  );

  if (
    Temporal.PlainDate.compare(
      thisYearPancakeDay,
      Temporal.Now.plainDateISO()
    ) === -1
  ) {
    return nextYearPancakeDay;
  }

  return thisYearPancakeDay;
};

export default getPancakeDayDate;
