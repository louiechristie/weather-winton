// /**
//  * "As a general rule, if the dew point is 60 degrees [Fahrenheit] or higher, the air will feel muggy."
//  * An Unofficial Mugginess Scale
//  * (courtesy of Answers@NOAA.gov)
//  * https://www.thoughtco.com/muggy-weather-overview-3444058
//  */

const getCelsiusFromKelvin = (kelvin) => {
  return kelvin + 273.15;
};

const getKelvinFromCelsius = (celsius) => {
  return celsius - 273.15;
};

const getCelsiusFromFahrenheit = (fahrenheit) => {
  return (fahrenheit - 32) / 1.8;
};

/**
 * "If you are interested in a simpler calculation that gives an approximation of dew point temperature if you know the observed temperature and relative humidity, the following formula was proposed in a 2005 article by Mark G. Lawrence in the Bulletin of the American Meteorological Society:
 * Td = T - ((100 - RH)/5.)""
 * https://iridl.ldeo.columbia.edu/dochelp/QA/Basic/dewpoint.html accessed 2020-01-29
 *
 *
 * @param number kelvin
 * @param number relativeHumidity
 *
 * @returns number dew poing in kelvin
 */
export const getDewPointFromKelvinAndRelativeHumidity = (
  kelvin,
  relativeHumidity
) => {
  return kelvin - (100 - relativeHumidity) / 5;
};

const getIsStickyFromCelsiusAndRelativeHumidity = (
  celsius,
  relativeHumidity
) => {
  const dewPoint = getCelsiusFromKelvin(
    getDewPointFromKelvinAndRelativeHumidity(
      getKelvinFromCelsius(celsius),
      relativeHumidity
    )
  );

  return dewPoint > getCelsiusFromFahrenheit(60);
};

export default getIsStickyFromCelsiusAndRelativeHumidity;
