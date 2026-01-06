const getIsWindy = (windSpeed10m: number) => {
  const windSpeedKilometersPerHour = windSpeed10m * 3.6;

  // https://www.theweathernetwork.com/en/news/weather/forecasts/wind-speed-cheat-sheet-how-to-gauge-wind-speed-damaging-gusts-hurricane-force
  if (windSpeedKilometersPerHour >= 30) {
    return true;
  }
  return false;
};

export default getIsWindy;
