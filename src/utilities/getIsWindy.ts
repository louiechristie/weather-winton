const getIsWindy = (windGustSpeed10m: number) => {
  // https://www.theweathernetwork.com/en/news/weather/forecasts/wind-speed-cheat-sheet-how-to-gauge-wind-speed-damaging-gusts-hurricane-force
  if (windGustSpeed10m >= 30) {
    return true;
  }
  return false;
};

export default getIsWindy;
