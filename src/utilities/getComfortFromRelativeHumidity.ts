export const COMFORTABLE = 'COMFORTABLE';
export const TOO_DRY = 'TOO_DRY';
export const TOO_HUMID = 'TOO_HUMID';

const isPercentage = (number: number) =>
  number >= 0 && number <= 100 && Number.isFinite(number);

export function getIsTooDryFromRelativeHumidity(
  relativeHumidityPercentage: number
): boolean {
  // University of Minnesota
  // https://extension.umn.edu/moisture-and-mold-indoors/do-you-have-too-much-moisture-your-home Accessed 2020-01-20
  if (
    isPercentage(relativeHumidityPercentage) &&
    relativeHumidityPercentage < 25
  ) {
    return true;
  }
  return false;
}

export function getIsTooHumidFromRelativeHumidity(
  relativeHumidityPercentage: number
): boolean {
  // University of Minnesota
  // chttps://extension.umn.edu/moisture-and-mold-indoors/do-you-have-too-much-moisture-your-home Accessed 2020-01-20

  if (
    isPercentage(relativeHumidityPercentage) &&
    relativeHumidityPercentage > 50
  ) {
    return true;
  }
  return false;
}

export default function getComfortFromRelativeHumidity(
  relativeHumidityPercentage: number
) {
  if (!isPercentage(relativeHumidityPercentage)) {
    return null;
  }
  if (getIsTooDryFromRelativeHumidity(relativeHumidityPercentage)) {
    return TOO_DRY;
  }
  if (getIsTooHumidFromRelativeHumidity(relativeHumidityPercentage)) {
    return TOO_HUMID;
  }
  return COMFORTABLE;
}
