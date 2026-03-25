import nearMidnightDailyJSON from '../../data/near-midnight/nearMidnightDaily.json' with { type: 'json' };
import nearMidnightHourlyJSON from '../../data/near-midnight/nearMidnightHourly.json' with { type: 'json' };

import {
  MetOfficeDailyForecastGeoJSONSchema,
  MetOfficeHourlyForecastGeoJSONSchema,
} from '../types/metOffice';

export const getMidnightDailyData = () => {
  const nearMidnightDaily = MetOfficeDailyForecastGeoJSONSchema.parse(
    nearMidnightDailyJSON
  );
  return nearMidnightDaily;
};

export const getMidnightHourlyData = () => {
  const nearMidnightHourly = MetOfficeHourlyForecastGeoJSONSchema.parse(
    nearMidnightHourlyJSON
  );
  return nearMidnightHourly;
};
