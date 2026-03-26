/*
 * Met Office DataHub Weather Forecast GeoJSON Types
 * Using Zod for runtime validation and type inference
 */

import { z } from 'zod';

// Met Office weather type mapping
export const weatherTypes: { [key: number]: string } = {
  // NA: 'Not available',
  0: 'Clear night',
  1: 'Sunny day',
  2: 'Partly cloudy (night)',
  3: 'Partly cloudy',
  4: 'Not used',
  5: 'Mist',
  6: 'Fog',
  7: 'Cloudy',
  8: 'Overcast',
  9: 'Light rain shower (night)',
  10: 'Light rain shower',
  11: 'Drizzle',
  12: 'Light rain',
  13: 'Heavy rain shower (night)',
  14: 'Heavy rain shower',
  15: 'Heavy rain',
  16: 'Sleet shower (night)',
  17: 'Sleet shower',
  18: 'Sleet',
  19: 'Hail shower (night)',
  20: 'Hail shower',
  21: 'Hail',
  22: 'Light snow shower (night)',
  23: 'Light snow shower',
  24: 'Light snow',
  25: 'Heavy snow shower (night)',
  26: 'Heavy snow shower',
  27: 'Heavy snow',
  28: 'Thunder shower (night)',
  29: 'Thunder shower',
  30: 'Thunder',
} as const;

/**
 * Weather codes enum
 */
export enum MetOfficeWeatherCode {
  ClearNight = 0,
  SunnyDay = 1,
  PartlyCloudyNight = 2,
  PartlyCloudyDay = 3,
  NotUsed = 4,
  Mist = 5,
  Fog = 6,
  CloudyDay = 7,
  OvercastDay = 8,
  LightRainShowerNight = 9,
  LightRainShowerDay = 10,
  Drizzle = 11,
  LightRain = 12,
  HeavyRainShowerNight = 13,
  HeavyRainShowerDay = 14,
  HeavyRain = 15,
  SleetShowerNight = 16,
  SleetShowerDay = 17,
  Sleet = 18,
  HailShowerNight = 19,
  HailShowerDay = 20,
  Hail = 21,
  LightSnowShowerNight = 22,
  LightSnowShowerDay = 23,
  LightSnow = 24,
  HeavySnowShowerNight = 25,
  HeavySnowShowerDay = 26,
  HeavySnow = 27,
  ThunderShowerNight = 28,
  ThunderShowerDay = 29,
  Thunder = 30,
}

// ============================================================================
// HOURLY FORECAST SCHEMAS
// ============================================================================

/**
 * Zod schema for hourly weather data
 */
export const HourlyWeatherDataSchema = z.object({
  time: z.string(), // ISO 8601 datetime string

  // Temperature parameters (degrees Celsius)
  screenTemperature: z.number(),
  maxScreenAirTemp: z.number().optional(), // Optional: retrospective field (max over previous hour), not available for future forecasts
  minScreenAirTemp: z.number().optional(), // Optional: retrospective field (min over previous hour), not available for future forecasts
  screenDewPointTemperature: z.number(),
  feelsLikeTemperature: z.number(),

  // Wind parameters
  windSpeed10m: z.number(), // m/s
  windDirectionFrom10m: z.number(), // degrees
  windGustSpeed10m: z.number(), // m/s
  max10mWindGust: z.number().optional(), // Optional: retrospective field (max gust over previous hour), not available for future forecasts

  // Atmospheric parameters
  visibility: z.number(), // metres
  screenRelativeHumidity: z.number(), // percentage
  mslp: z.number(), // pascals
  uvIndex: z.number(), // dimensionless

  // Weather condition
  significantWeatherCode: z.number(), // Met Office weather code

  // Precipitation parameters
  precipitationRate: z.number(), // mm/h
  totalPrecipAmount: z.number().optional(), // Optional: total accumulated precipitation, may not be available for all forecast periods
  totalSnowAmount: z.number().optional(), // Optional: total accumulated snow, may not be available for all forecast periods or when no snow expected
  probOfPrecipitation: z.number(), // percentage
});

export type HourlyWeatherData = z.infer<typeof HourlyWeatherDataSchema>;

/**
 * Zod schema for hourly weather forecast properties
 */
export const HourlyWeatherForecastPropertiesSchema = z.object({
  requestPointDistance: z.number(), // metres
  modelRunDate: z.string(), // ISO 8601 datetime string
  timeSeries: z.array(HourlyWeatherDataSchema),
});

export type HourlyWeatherForecastProperties = z.infer<
  typeof HourlyWeatherForecastPropertiesSchema
>;

/**
 * Zod schema for GeoJSON Point
 */
const PointSchema = z.object({
  type: z.literal('Point'),
  coordinates: z.array(z.number()).min(2),
});

/**
 * Zod schema for hourly weather forecast feature
 */
export const HourlyWeatherForecastFeatureSchema = z.object({
  type: z.literal('Feature'),
  geometry: PointSchema,
  properties: HourlyWeatherForecastPropertiesSchema,
});

export type HourlyWeatherForecastFeature = z.infer<
  typeof HourlyWeatherForecastFeatureSchema
>;

/**
 * Zod schema for parameter metadata
 */
const ParameterUnitSchema = z.object({
  label: z.string(),
  symbol: z.object({
    value: z.string(),
    type: z.string(),
  }),
});

const ParameterMetadataItemSchema = z.object({
  type: z.literal('Parameter'),
  description: z.string(),
  unit: ParameterUnitSchema,
});

export const ParameterMetadataSchema = z.record(
  z.string(),
  ParameterMetadataItemSchema
);

export type ParameterMetadata = z.infer<typeof ParameterMetadataSchema>;
export type ParameterUnit = z.infer<typeof ParameterUnitSchema>;

/**
 * Zod schema for Met Office hourly forecast GeoJSON
 */
export const MetOfficeHourlyForecastGeoJSONSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(HourlyWeatherForecastFeatureSchema),
  parameters: z.any().optional(), // Parameters structure varies, skip strict validation
});

export type MetOfficeHourlyForecastGeoJSON = z.infer<
  typeof MetOfficeHourlyForecastGeoJSONSchema
>;

// ============================================================================
// DAILY FORECAST SCHEMAS
// ============================================================================

const DailyWeatherPreviousNightDataSchema = z.object({
  time: z.string(), // ISO 8601 date string
  midnight10MWindSpeed: z.number(), // m/s
  midnight10MWindDirection: z.number(), // degrees
  midnight10MWindGust: z.number(), // m/s
  midnightVisibility: z.number(),
  midnightRelativeHumidity: z.number(),
  midnightMslp: z.number(),
  nightMinScreenTemperature: z.number(),
  nightUpperBoundMinTemp: z.number(),
  nightLowerBoundMinTemp: z.number(),
  nightUpperBoundMinFeelsLikeTemp: z.number(),
  nightLowerBoundMinFeelsLikeTemp: z.number(),
});

export type DailyWeatherPreviousNightData = z.infer<
  typeof DailyWeatherPreviousNightDataSchema
>;

export const DailyWeatherDataSchema =
  DailyWeatherPreviousNightDataSchema.extend({
    // Wind parameters
    midday10MWindSpeed: z.number(), // m/s
    midday10MWindDirection: z.number(), // degrees
    midday10MWindGust: z.number(), // m/s

    // Visibility parameters (metres)
    middayVisibility: z.number(),

    // Humidity parameters (percentage)
    middayRelativeHumidity: z.number(),

    // Pressure parameters (pascals)
    middayMslp: z.number(),

    // UV parameters
    maxUvIndex: z.number(),

    // Weather codes
    daySignificantWeatherCode: z.number(),
    nightSignificantWeatherCode: z.number(),

    // Temperature parameters (degrees Celsius)
    dayMaxScreenTemperature: z.number(),
    dayUpperBoundMaxTemp: z.number(),
    dayLowerBoundMaxTemp: z.number(),

    // Feels like temperature parameters (degrees Celsius)
    dayMaxFeelsLikeTemp: z.number(),
    nightMinFeelsLikeTemp: z.number(),
    dayUpperBoundMaxFeelsLikeTemp: z.number(),
    dayLowerBoundMaxFeelsLikeTemp: z.number(),

    // Precipitation probability parameters (percentage)
    dayProbabilityOfPrecipitation: z.number(),
    nightProbabilityOfPrecipitation: z.number(),
    dayProbabilityOfSnow: z.number(),
    nightProbabilityOfSnow: z.number(),
    dayProbabilityOfHeavySnow: z.number(),
    nightProbabilityOfHeavySnow: z.number(),
    dayProbabilityOfRain: z.number(),
    nightProbabilityOfRain: z.number(),
    dayProbabilityOfHeavyRain: z.number(),
    nightProbabilityOfHeavyRain: z.number(),
    dayProbabilityOfHail: z.number(),
    nightProbabilityOfHail: z.number(),
    dayProbabilityOfSferics: z.number(),
    nightProbabilityOfSferics: z.number(),
  });

export type DailyWeatherData = z.infer<typeof DailyWeatherDataSchema>;

/**
 * Zod schema for daily weather forecast properties
 */
export const DailyWeatherForecastPropertiesSchema = z.object({
  requestPointDistance: z.number(), // metres
  modelRunDate: z.string(), // ISO 8601 datetime string
  timeSeries: z.array(DailyWeatherDataSchema),
});

export type DailyWeatherForecastProperties = z.infer<
  typeof DailyWeatherForecastPropertiesSchema
>;

// Before filtering to today onwards, the first item is the previous night's forecast, which has a different schema (missing day parameters). We use a tuple to enforce this structure.
export const DailyWeatherTimeSeriesRawSchema = z
  .tuple([DailyWeatherPreviousNightDataSchema])
  .rest(DailyWeatherDataSchema);

export type DailyWeatherTimeSeriesRawData = z.infer<
  typeof DailyWeatherTimeSeriesRawSchema
>;

export const DailyWeatherForecastPropertiesRawSchema = z.object({
  requestPointDistance: z.number(), // metres
  modelRunDate: z.string(), // ISO 8601 datetime string
  timeSeries: DailyWeatherTimeSeriesRawSchema,
});

export type DailyWeatherForecastRawProperties = z.infer<
  typeof DailyWeatherForecastPropertiesSchema
>;

/**
 * Zod schema for daily weather forecast feature
 */
export const DailyWeatherForecastFeatureSchema = z.object({
  type: z.literal('Feature'),
  geometry: PointSchema,
  properties: DailyWeatherForecastPropertiesSchema,
});

export type DailyWeatherForecastFeature = z.infer<
  typeof DailyWeatherForecastFeatureSchema
>;

export const DailyWeatherForecastFeatureRawSchema = z.object({
  type: z.literal('Feature'),
  geometry: PointSchema,
  properties: DailyWeatherForecastPropertiesRawSchema,
});

export type DailyWeatherForecastRawFeature = z.infer<
  typeof DailyWeatherForecastFeatureRawSchema
>;

/**
 * Zod schema for Met Office daily forecast GeoJSON
 */
export const MetOfficeDailyForecastGeoJSONSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(DailyWeatherForecastFeatureSchema),
  parameters: z.any().optional(), // Parameters structure varies, skip strict validation
});

export type MetOfficeDailyForecastGeoJSON = z.infer<
  typeof MetOfficeDailyForecastGeoJSONSchema
>;

/**
 * Zod schema for Met Office daily forecast GeoJSON
 */
export const MetOfficeDailyForecastGeoJSONRawSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(DailyWeatherForecastFeatureRawSchema),
  parameters: z.any().optional(), // Parameters structure varies, skip strict validation
});

export type MetOfficeDailyForecastGeoRawJSON = z.infer<
  typeof MetOfficeDailyForecastGeoJSONRawSchema
>;

// ============================================================================
// TYPE GUARDS (using Zod validation)
// ============================================================================

/**
 * Type guard for hourly weather data
 */
export function isHourlyWeatherData(data: unknown): data is HourlyWeatherData {
  return HourlyWeatherDataSchema.safeParse(data).success;
}

/**
 * Type guard for hourly weather forecast properties
 */
export function isHourlyWeatherForecastProperties(
  data: unknown
): data is HourlyWeatherForecastProperties {
  return HourlyWeatherForecastPropertiesSchema.safeParse(data).success;
}

/**
 * Type guard for Met Office hourly forecast GeoJSON
 */
export function isMetOfficeHourlyForecastGeoJSON(
  data: unknown
): data is MetOfficeHourlyForecastGeoJSON {
  return MetOfficeHourlyForecastGeoJSONSchema.safeParse(data).success;
}

/**
 * Type guard for daily weather data
 */
export function isDailyWeatherData(data: unknown): data is DailyWeatherData {
  return DailyWeatherDataSchema.safeParse(data).success;
}

/**
 * Type guard for daily weather forecast properties
 */
export function isDailyWeatherForecastProperties(
  data: unknown
): data is DailyWeatherForecastProperties {
  return DailyWeatherForecastPropertiesSchema.safeParse(data).success;
}

/**
 * Type guard for Met Office daily forecast GeoJSON
 */
export function isMetOfficeDailyForecastGeoJSON(
  data: unknown
): data is MetOfficeDailyForecastGeoJSON {
  return MetOfficeDailyForecastGeoJSONSchema.safeParse(data).success;
}
