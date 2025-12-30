import { Temporal } from 'temporal-polyfill';
import { MetOfficeHourlyForecastGeoJSON } from '../types/metOffice';

const getCurrentTemperature = (
  hourlyJson: MetOfficeHourlyForecastGeoJSON,
  currentTime: string = Temporal.Now.instant().toString()
): number => {
  const timeZoneId = Temporal.Now.timeZoneId();
  const currentTimeInstant = Temporal.Instant.from(currentTime);
  const currentTimeZonedDateTime =
    currentTimeInstant.toZonedDateTimeISO(timeZoneId);

  return hourlyJson.features[0].properties.timeSeries
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
};

export default getCurrentTemperature;
