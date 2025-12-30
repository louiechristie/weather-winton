// import { SpotForecastFeatureCollection } from '../api/typescript-fetch-client/api';
import getMockDate, { getDateAt11PM } from './getMockDate';

const mockHourlyMetOfficeJSON /* : SpotForecastFeatureCollection */ = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-0.050960000000000005, 51.48593, 15.0],
      },
      properties: {
        requestPointDistance: 1383.1984,
        modelRunDate: '2023-07-10T17:00Z',
        timeSeries: [
          {
            time: getMockDate(),
            screenTemperature: 21.99,
            maxScreenAirTemp: 22.24,
            minScreenAirTemp: 21.98,
            screenDewPointTemperature: 12.34,
            feelsLikeTemperature: 19.0,
            windSpeed10m: 6.17,
            windDirectionFrom10m: 227,
            windGustSpeed10m: 12.86,
            max10mWindGust: 12.86,
            visibility: 21828,
            screenRelativeHumidity: 53.73,
            mslp: 101750,
            uvIndex: 2,
            significantWeatherCode: 7,
            precipitationRate: 0.0,
            totalPrecipAmount: 0.0,
            totalSnowAmount: 0,
            probOfPrecipitation: 5,
          },
          {
            time: getDateAt11PM(),
            screenTemperature: 18.09,
            maxScreenAirTemp: 18.42,
            minScreenAirTemp: 18.07,
            screenDewPointTemperature: 16.04,
            feelsLikeTemperature: 16.76,
            windSpeed10m: 4.92,
            windDirectionFrom10m: 225,
            windGustSpeed10m: 9.77,
            max10mWindGust: 10.98,
            visibility: 13372,
            screenRelativeHumidity: 87.89,
            mslp: 101066,
            uvIndex: 1,
            significantWeatherCode: 15,
            precipitationRate: 1.49,
            totalPrecipAmount: 0.18,
            totalSnowAmount: 0,
            probOfPrecipitation: 82,
          },
        ],
      },
    },
  ],
  parameters: [
    {
      totalSnowAmount: {
        type: 'Parameter',
        description: 'Total Snow Amount Over Previous Hour',
        unit: {
          label: 'millimetres',
          symbol: {
            value: 'http://www.opengis.net/def/uom/UCUM/',
            type: 'mm',
          },
        },
      },
      screenTemperature: {
        type: 'Parameter',
        description: 'Screen Air Temperature',
        unit: {
          label: 'degrees Celsius',
          symbol: {
            value: 'http://www.opengis.net/def/uom/UCUM/',
            type: 'Cel',
          },
        },
      },
      visibility: {
        type: 'Parameter',
        description: 'Visibility',
        unit: {
          label: 'metres',
          symbol: {
            value: 'http://www.opengis.net/def/uom/UCUM/',
            type: 'm',
          },
        },
      },
      windDirectionFrom10m: {
        type: 'Parameter',
        description: '10m Wind From Direction',
        unit: {
          label: 'degrees',
          symbol: {
            value: 'http://www.opengis.net/def/uom/UCUM/',
            type: 'deg',
          },
        },
      },
      precipitationRate: {
        type: 'Parameter',
        description: 'Precipitation Rate',
        unit: {
          label: 'millimetres per hour',
          symbol: {
            value: 'http://www.opengis.net/def/uom/UCUM/',
            type: 'mm/h',
          },
        },
      },
      maxScreenAirTemp: {
        type: 'Parameter',
        description: 'Maximum Screen Air Temperature Over Previous Hour',
        unit: {
          label: 'degrees Celsius',
          symbol: {
            value: 'http://www.opengis.net/def/uom/UCUM/',
            type: 'Cel',
          },
        },
      },
      feelsLikeTemperature: {
        type: 'Parameter',
        description: 'Feels Like Temperature',
        unit: {
          label: 'degrees Celsius',
          symbol: {
            value: 'http://www.opengis.net/def/uom/UCUM/',
            type: 'Cel',
          },
        },
      },
      screenDewPointTemperature: {
        type: 'Parameter',
        description: 'Screen Dew Point Temperature',
        unit: {
          label: 'degrees Celsius',
          symbol: {
            value: 'http://www.opengis.net/def/uom/UCUM/',
            type: 'Cel',
          },
        },
      },
      screenRelativeHumidity: {
        type: 'Parameter',
        description: 'Screen Relative Humidity',
        unit: {
          label: 'percentage',
          symbol: {
            value: 'http://www.opengis.net/def/uom/UCUM/',
            type: '%',
          },
        },
      },
      windSpeed10m: {
        type: 'Parameter',
        description: '10m Wind Speed',
        unit: {
          label: 'metres per second',
          symbol: {
            value: 'http://www.opengis.net/def/uom/UCUM/',
            type: 'm/s',
          },
        },
      },
      probOfPrecipitation: {
        type: 'Parameter',
        description: 'Probability of Precipitation',
        unit: {
          label: 'percentage',
          symbol: {
            value: 'http://www.opengis.net/def/uom/UCUM/',
            type: '%',
          },
        },
      },
      max10mWindGust: {
        type: 'Parameter',
        description: 'Maximum 10m Wind Gust Speed Over Previous Hour',
        unit: {
          label: 'metres per second',
          symbol: {
            value: 'http://www.opengis.net/def/uom/UCUM/',
            type: 'm/s',
          },
        },
      },
      significantWeatherCode: {
        type: 'Parameter',
        description: 'Significant Weather Code',
        unit: {
          label: 'dimensionless',
          symbol: {
            value:
              'https://metoffice.apiconnect.ibmcloud.com/metoffice/production/',
            type: '1',
          },
        },
      },
      minScreenAirTemp: {
        type: 'Parameter',
        description: 'Minimum Screen Air Temperature Over Previous Hour',
        unit: {
          label: 'degrees Celsius',
          symbol: {
            value: 'http://www.opengis.net/def/uom/UCUM/',
            type: 'Cel',
          },
        },
      },
      totalPrecipAmount: {
        type: 'Parameter',
        description: 'Total Precipitation Amount Over Previous Hour',
        unit: {
          label: 'millimetres',
          symbol: {
            value: 'http://www.opengis.net/def/uom/UCUM/',
            type: 'mm',
          },
        },
      },
      mslp: {
        type: 'Parameter',
        description: 'Mean Sea Level Pressure',
        unit: {
          label: 'pascals',
          symbol: {
            value: 'http://www.opengis.net/def/uom/UCUM/',
            type: 'Pa',
          },
        },
      },
      windGustSpeed10m: {
        type: 'Parameter',
        description: '10m Wind Gust Speed',
        unit: {
          label: 'metres per second',
          symbol: {
            value: 'http://www.opengis.net/def/uom/UCUM/',
            type: 'm/s',
          },
        },
      },
      uvIndex: {
        type: 'Parameter',
        description: 'UV Index',
        unit: {
          label: 'dimensionless',
          symbol: {
            value: 'http://www.opengis.net/def/uom/UCUM/',
            type: '1',
          },
        },
      },
    },
  ],
};

const getMockHourlyMetOfficeJSON = () => mockHourlyMetOfficeJSON;

export default getMockHourlyMetOfficeJSON;
