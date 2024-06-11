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

export function getIsFrostyFromCelsius(celsius) {
  // Frost is likely below 4 degrees celsius
  // https://www.metoffice.gov.uk/weather/learn-about/weather/types-of-weather/frost-and-ice/forecasting-frost
  if (celsius <= 4) {
    return true;
  }
}

// export function getIsComfortableRoomTemperatureFromCelsius(celsius) {
//   // The World Health Organization's standard ...
//   // For those with respiratory problems or allergies, they recommend no less than 16 °C */
//   // From https://en.wikipedia.org/wiki/Room_temperature Accessed 2019-12-28
//   if (
//     !getIsTooHotForRoomTemperatureFromCelsius(celsius) &&
//     getIsTooColdForRoomTemperatureFromCelsius(celsius)
//   ) {
//     return true;
//   }
//   return false;
// }

export function getTemperatureFriendly(celsius) {
  if (!isFinite(celsius)) return null;
  if (getIsTooHotForRoomTemperatureFromCelsius(celsius)) {
    return 'Hot 🥵';
  }
  if (getIsFrostyFromCelsius(celsius)) {
    return 'Freezing 🥶';
  }
  if (getIsTooColdForRoomTemperatureFromCelsius(celsius)) {
    return 'Cold';
  }
  return 'Warm';
}
