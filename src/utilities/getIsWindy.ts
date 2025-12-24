const getIsWindy = (windGustSpeed10m: number) => {
  const windGustSpeedKilometersPerHour = windGustSpeed10m * 3.6;

  // https://www.theweathernetwork.com/en/news/weather/forecasts/wind-speed-cheat-sheet-how-to-gauge-wind-speed-damaging-gusts-hurricane-force
  if (windGustSpeedKilometersPerHour >= 30) {
    return true;
  }
  return false;
};

export default getIsWindy;
