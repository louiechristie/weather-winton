/*
 * Met Office DataHub Weather Forecast GeoJSON Types
 * Using Zod for runtime validation and type inference
 */

import { z } from 'zod';

// Met Office weather type mapping
export const weatherTypes = {
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

export const ParameterMetadataSchema = z.record(z.string(), ParameterMetadataItemSchema);

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

/**
 * Zod schema for daily weather data
 */
export const DailyWeatherDataSchema = z.object({
  time: z.string(), // ISO 8601 date string

  // Wind parameters
  midday10MWindSpeed: z.number(), // m/s
  midnight10MWindSpeed: z.number(), // m/s
  midday10MWindDirection: z.number(), // degrees
  midnight10MWindDirection: z.number(), // degrees
  midday10MWindGust: z.number(), // m/s
  midnight10MWindGust: z.number(), // m/s

  // Visibility parameters (metres)
  middayVisibility: z.number(),
  midnightVisibility: z.number(),

  // Humidity parameters (percentage)
  middayRelativeHumidity: z.number(),
  midnightRelativeHumidity: z.number(),

  // Pressure parameters (pascals)
  middayMslp: z.number(),
  midnightMslp: z.number(),

  // UV parameters
  maxUvIndex: z.number(),

  // Weather codes
  daySignificantWeatherCode: z.number(),
  nightSignificantWeatherCode: z.number(),

  // Temperature parameters (degrees Celsius)
  dayMaxScreenTemperature: z.number(),
  nightMinScreenTemperature: z.number(),
  dayUpperBoundMaxTemp: z.number(),
  nightUpperBoundMinTemp: z.number(),
  dayLowerBoundMaxTemp: z.number(),
  nightLowerBoundMinTemp: z.number(),

  // Feels like temperature parameters (degrees Celsius)
  dayMaxFeelsLikeTemp: z.number(),
  nightMinFeelsLikeTemp: z.number(),
  dayUpperBoundMaxFeelsLikeTemp: z.number(),
  nightUpperBoundMinFeelsLikeTemp: z.number(),
  dayLowerBoundMaxFeelsLikeTemp: z.number(),
  nightLowerBoundMinFeelsLikeTemp: z.number(),

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

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get weather data for a specific hour
 */
export function getHourlyWeatherForTime(
  forecast: MetOfficeHourlyForecastGeoJSON,
  dateTime: string | Date,
  featureIndex: number = 0
): HourlyWeatherData | null {
  const feature = forecast.features[featureIndex];
  if (!feature) return null;

  const targetDateTime =
    typeof dateTime === 'string' ? dateTime : dateTime.toISOString();

  return (
    feature.properties.timeSeries.find(
      (hour) => hour.time === targetDateTime
    ) || null
  );
}

/**
 * Get current/latest hourly weather data
 */
export function getCurrentHourlyWeather(
  forecast: MetOfficeHourlyForecastGeoJSON,
  featureIndex: number = 0
): HourlyWeatherData | null {
  const feature = forecast.features[featureIndex];
  if (!feature || feature.properties.timeSeries.length === 0) return null;

  const now = new Date();
  const currentHour = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours()
  ).toISOString();

  const currentData = feature.properties.timeSeries.find(
    (hour) => hour.time.startsWith(currentHour.substring(0, 13))
  );

  if (currentData) return currentData;

  return feature.properties.timeSeries[0];
}

/**
 * Get hourly data for a specific date
 */
export function getHourlyWeatherForDate(
  forecast: MetOfficeHourlyForecastGeoJSON,
  date: string | Date,
  featureIndex: number = 0
): HourlyWeatherData[] {
  const feature = forecast.features[featureIndex];
  if (!feature) return [];

  const targetDate =
    typeof date === 'string' ? date : date.toISOString().split('T')[0];

  return feature.properties.timeSeries.filter((hour) =>
    hour.time.startsWith(targetDate)
  );
}

/**
 * Get all available hours in the forecast
 */
export function getAvailableHours(
  forecast: MetOfficeHourlyForecastGeoJSON,
  featureIndex: number = 0
): string[] {
  const feature = forecast.features[featureIndex];
  if (!feature) return [];

  return feature.properties.timeSeries.map((hour) => hour.time);
}

/**
 * Get weather data for a specific date
 */
export function getWeatherForDate(
  forecast: MetOfficeDailyForecastGeoJSON,
  date: string | Date,
  featureIndex: number = 0
): DailyWeatherData | null {
  const feature = forecast.features[featureIndex];
  if (!feature) return null;

  const targetDate =
    typeof date === 'string' ? date : date.toISOString().split('T')[0];

  return (
    feature.properties.timeSeries.find((day) =>
      day.time.startsWith(targetDate)
    ) || null
  );
}

/**
 * Get the latest/current weather data
 */
export function getCurrentWeather(
  forecast: MetOfficeDailyForecastGeoJSON,
  featureIndex: number = 0
): DailyWeatherData | null {
  const feature = forecast.features[featureIndex];
  if (!feature || feature.properties.timeSeries.length === 0) return null;

  const now = new Date();
  const today = now.toISOString().split('T')[0];

  const todayData = feature.properties.timeSeries.find((day) =>
    day.time.startsWith(today)
  );

  if (todayData) return todayData;

  return feature.properties.timeSeries[0];
}

/**
 * Get all dates available in the forecast
 */
export function getAvailableDates(
  forecast: MetOfficeDailyForecastGeoJSON,
  featureIndex: number = 0
): string[] {
  const feature = forecast.features[featureIndex];
  if (!feature) return [];

  return feature.properties.timeSeries.map((day) => day.time.split('T')[0]);
}

/**
 * Get parameter metadata by parameter name
 */
export function getParameterMetadata(
  forecast: MetOfficeDailyForecastGeoJSON,
  parameterName: keyof DailyWeatherData
): ParameterMetadata | null {
  if (!forecast.parameters || !Array.isArray(forecast.parameters)) return null;

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    forecast.parameters.find((param: any) =>
      Object.prototype.hasOwnProperty.call(param, parameterName)
    ) || null
  );
}

/**
 * Temperature range interface
 */
export interface TemperatureRange {
  max: number;
  min: number;
  maxUpperBound?: number;
  maxLowerBound?: number;
  minUpperBound?: number;
  minLowerBound?: number;
}

/**
 * Get temperature range for a day
 */
export function getTemperatureRange(
  day: DailyWeatherData
): TemperatureRange | null {
  if (
    day.dayMaxScreenTemperature === undefined ||
    day.nightMinScreenTemperature === undefined
  ) {
    return null;
  }

  return {
    max: day.dayMaxScreenTemperature,
    min: day.nightMinScreenTemperature,
    maxUpperBound: day.dayUpperBoundMaxTemp,
    maxLowerBound: day.dayLowerBoundMaxTemp,
    minUpperBound: day.nightUpperBoundMinTemp,
    minLowerBound: day.nightLowerBoundMinTemp,
  };
}

/**
 * Temperature trend interface
 */
export interface TemperatureTrend {
  timestamps: string[];
  temperatures: number[];
  feelsLike: number[];
  min: number;
  max: number;
  average: number;
}

/**
 * Get temperature trend over time (hourly data)
 */
export function getHourlyTemperatureTrend(
  forecast: MetOfficeHourlyForecastGeoJSON,
  featureIndex: number = 0
): TemperatureTrend | null {
  const feature = forecast.features[featureIndex];
  if (!feature) return null;

  const validHours = feature.properties.timeSeries.filter(
    (hour) =>
      hour.screenTemperature !== undefined &&
      hour.feelsLikeTemperature !== undefined
  );

  if (validHours.length === 0) return null;

  const temperatures = validHours.map((hour) => hour.screenTemperature!);
  const feelsLike = validHours.map((hour) => hour.feelsLikeTemperature!);

  return {
    timestamps: validHours.map((hour) => hour.time),
    temperatures,
    feelsLike,
    min: Math.min(...temperatures),
    max: Math.max(...temperatures),
    average:
      temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length,
  };
}

/**
 * Precipitation forecast interface
 */
export interface PrecipitationForecast {
  timestamps: string[];
  rates: number[];
  amounts: number[];
  probabilities: number[];
  snowAmounts: number[];
  totalAmount: number;
  peakRate: number;
  averageProbability: number;
}

/**
 * Get precipitation forecast (hourly data)
 */
export function getHourlyPrecipitationForecast(
  forecast: MetOfficeHourlyForecastGeoJSON,
  featureIndex: number = 0
): PrecipitationForecast | null {
  const feature = forecast.features[featureIndex];
  if (!feature) return null;

  const validHours = feature.properties.timeSeries.filter(
    (hour) =>
      hour.precipitationRate !== undefined ||
      hour.totalPrecipAmount !== undefined ||
      hour.probOfPrecipitation !== undefined
  );

  if (validHours.length === 0) return null;

  const rates = validHours.map((hour) => hour.precipitationRate ?? 0);
  const amounts = validHours.map((hour) => hour.totalPrecipAmount ?? 0);
  const probabilities = validHours.map((hour) => hour.probOfPrecipitation ?? 0);
  const snowAmounts = validHours.map((hour) => hour.totalSnowAmount ?? 0);

  return {
    timestamps: validHours.map((hour) => hour.time),
    rates,
    amounts,
    probabilities,
    snowAmounts,
    totalAmount: amounts.reduce((sum, amount) => sum + amount, 0),
    peakRate: Math.max(...rates),
    averageProbability:
      probabilities.reduce((sum, prob) => sum + prob, 0) / probabilities.length,
  };
}

/**
 * Precipitation probabilities interface
 */
export interface PrecipitationProbabilities {
  day: {
    precipitation?: number;
    rain?: number;
    heavyRain?: number;
    snow?: number;
    heavySnow?: number;
    hail?: number;
    sferics?: number;
  };
  night: {
    precipitation?: number;
    rain?: number;
    heavyRain?: number;
    snow?: number;
    heavySnow?: number;
    hail?: number;
    sferics?: number;
  };
}

/**
 * Get precipitation probabilities for a day
 */
export function getPrecipitationProbabilities(
  day: DailyWeatherData
): PrecipitationProbabilities {
  return {
    day: {
      precipitation: day.dayProbabilityOfPrecipitation,
      rain: day.dayProbabilityOfRain,
      heavyRain: day.dayProbabilityOfHeavyRain,
      snow: day.dayProbabilityOfSnow,
      heavySnow: day.dayProbabilityOfHeavySnow,
      hail: day.dayProbabilityOfHail,
      sferics: day.dayProbabilityOfSferics,
    },
    night: {
      precipitation: day.nightProbabilityOfPrecipitation,
      rain: day.nightProbabilityOfRain,
      heavyRain: day.nightProbabilityOfHeavyRain,
      snow: day.nightProbabilityOfSnow,
      heavySnow: day.nightProbabilityOfHeavySnow,
      hail: day.nightProbabilityOfHail,
      sferics: day.nightProbabilityOfSferics,
    },
  };
}

/**
 * API response wrapper
 */
export interface MetOfficeApiResponse {
  data?: MetOfficeDailyForecastGeoJSON;
  status?: string;
  message?: string;
  timestamp?: string;
}
