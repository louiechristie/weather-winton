export const COMFORTABLE = 'COMFORTABLE';
export const TOO_DRY = 'TOO_DRY';
export const TOO_HUMID = 'TOO_HUMID';

export function getIsTooDryFromRelativeHumidity(relativeHumidity) {
  // University of Minnesota
  // https://extension.umn.edu/moisture-and-mold-indoors/do-you-have-too-much-moisture-your-home Accessed 2020-01-20
  if (relativeHumidity < 25) {
    return true;
  }
  return false;
}

export function getIsTooHumidFromRelativeHumidity(relativeHumidity) {
  // University of Minnesota
  // chttps://extension.umn.edu/moisture-and-mold-indoors/do-you-have-too-much-moisture-your-home Accessed 2020-01-20

  if (relativeHumidity > 50) {
    return true;
  }
  return false;
}

export default function getComfortFromRelativeHumidity(relativeHumidity) {
  if (
    !Number.isFinite(relativeHumidity) ||
    relativeHumidity < 0 ||
    relativeHumidity > 100
  ) {
    return null;
  }
  if (getIsTooDryFromRelativeHumidity(relativeHumidity)) {
    return TOO_DRY;
  }
  if (getIsTooHumidFromRelativeHumidity(relativeHumidity)) {
    return TOO_HUMID;
  }
  return COMFORTABLE;
}
