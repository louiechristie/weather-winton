export const COMFORTABLE = 'COMFORTABLE';
export const TOO_HOT = 'TOO_HOT';
export const TOO_COLD = 'TOO_COLD';

export function getIsTooHotForRoomTemperatureFromCelsius(celsius) {
  // the maximum should be below 24 °C (75 °F) – and to avoid sick building syndrome, below 22 °C (72 °F).[3]
  // From https://en.wikipedia.org/wiki/Room_temperature Accessed 2019-12-28
  if (celsius > 24) {
    return true;
  }
  return false;
}

export function getIsTooColdForRoomTemperatureFromCelsius(celsius) {
  // The World Health Organization's standard ...
  // For those with respiratory problems or allergies, they recommend no less than 16 °C */
  // From https://en.wikipedia.org/wiki/Room_temperature Accessed 2019-12-28
  if (celsius < 16) {
    return true;
  }
  return false;
}

export default function getRoomTemperatureComfortFromCelsius(celsius) {
  if (!Number.isFinite(celsius)) {
    return null;
  }
  if (getIsTooHotForRoomTemperatureFromCelsius(celsius)) {
    return TOO_HOT;
  }
  if (getIsTooColdForRoomTemperatureFromCelsius(celsius)) {
    return TOO_COLD;
  }
  return COMFORTABLE;
}
