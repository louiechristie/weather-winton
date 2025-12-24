import { Temporal } from 'temporal-polyfill';

import getEaster from './getEaster';

const getPancakeDayDate = (year: number = Temporal.Now.plainDateISO().year) => {
  const easter = getEaster(year);
  const duration = Temporal.Duration.from({ days: 47 });
  const pancakeDayDate = easter.subtract(duration);

  return pancakeDayDate;
};

export default getPancakeDayDate;
