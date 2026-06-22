import { Temporal } from 'temporal-polyfill/full';
import { MetOfficeHourlyForecastGeoJSON } from '../types/metOffice';

const getCurrentTemperature = (
  hourlyJson: MetOfficeHourlyForecastGeoJSON,
  currentTime: string = Temporal.Now.instant().toString()
): number | null => {
  const timeZoneId = Temporal.Now.timeZoneId();
  const currentTimeInstant = Temporal.Instant.from(currentTime);
  const currentTimeZonedDateTime =
    currentTimeInstant.toZonedDateTimeISO(timeZoneId);

  const currentTemperature = hourlyJson.features[0].properties.timeSeries
    .filter(
      (hour) =>
        Temporal.ZonedDateTime.compare(
          Temporal.Instant.from(hour.time).toZonedDateTimeISO(timeZoneId),
          currentTimeZonedDateTime.with({
            minute: 0,
            second: 0,
            millisecond: 0,
          })
        ) === 0
    )
    .map((hour) => hour.screenTemperature)[0];

  return currentTemperature || null;
};

export default getCurrentTemperature;
