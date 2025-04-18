import dayjs from 'dayjs';

const now = dayjs();

const today = now.toISOString();
const tomorrow = now.add('1', 'day').toISOString();
const yesterday = now.subtract('1', 'day').toISOString();

const generateMockDailyMetOfficeJSON = () => {
  const mockMetOfficeJSON = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-0.03304, 51.47686, 8],
        },
        properties: {
          requestPointDistance: 222.305,
          modelRunDate: '2020-05-19T21:00Z',
          timeSeries: [
            {
              time: yesterday,
              midday10MWindSpeed: 2.5680656,
              midnight10MWindSpeed: 2.1527302,
              midday10MWindDirection: 239,
              midnight10MWindDirection: 159,
              midday10MWindGust: 7.099931,
              midnight10MWindGust: 4.5832615,
              middayVisibility: 30819,
              midnightVisibility: 29490,
              middayRelativeHumidity: 40.401024,
              midnightRelativeHumidity: 54.772972,
              middayMslp: 103364,
              midnightMslp: 103221,
              maxUvIndex: 7,
              daySignificantWeatherCode: 1,
              nightSignificantWeatherCode: 0,
              dayMaxScreenTemperature: 23.335526,
              nightMinScreenTemperature: 13.311786,
              dayUpperBoundMaxTemp: 25.590603,
              nightUpperBoundMinTemp: 17.278984,
              dayLowerBoundMaxTemp: 17.476381,
              nightLowerBoundMinTemp: 8.664566,
              dayMaxFeelsLikeTemp: 20.79,
              nightMinFeelsLikeTemp: 13.62,
              dayUpperBoundMaxFeelsLikeTemp: 24.765,
              nightUpperBoundMinFeelsLikeTemp: 16.576,
              dayLowerBoundMaxFeelsLikeTemp: 15.293,
              nightLowerBoundMinFeelsLikeTemp: 7.9884,
              dayProbabilityOfPrecipitation: 0,
              nightProbabilityOfPrecipitation: 0,
              dayProbabilityOfSnow: 0,
              nightProbabilityOfSnow: 0,
              dayProbabilityOfHeavySnow: 0,
              nightProbabilityOfHeavySnow: 0,
              dayProbabilityOfRain: 0,
              nightProbabilityOfRain: 0,
              dayProbabilityOfHeavyRain: 0,
              nightProbabilityOfHeavyRain: 0,
              dayProbabilityOfHail: 0,
              nightProbabilityOfHail: 0,
              dayProbabilityOfSferics: 0,
              nightProbabilityOfSferics: 0,
            },
            {
              time: today,
              midday10MWindSpeed: 5.2,
              midnight10MWindSpeed: 3.03,
              midday10MWindDirection: 242,
              midnight10MWindDirection: 258,
              midday10MWindGust: 8.23,
              midnight10MWindGust: 6.17,
              middayVisibility: 19518,
              midnightVisibility: 21802,
              middayRelativeHumidity: 34.76,
              midnightRelativeHumidity: 58.3,
              middayMslp: 102330,
              midnightMslp: 102370,
              maxUvIndex: 7,
              daySignificantWeatherCode: 3,
              nightSignificantWeatherCode: 7,
              dayMaxScreenTemperature: 22.197664,
              nightMinScreenTemperature: 12.942589,
              dayUpperBoundMaxTemp: 23.6688,
              nightUpperBoundMinTemp: 14.7560425,
              dayLowerBoundMaxTemp: 19.913637,
              nightLowerBoundMinTemp: 10.00107,
              dayMaxFeelsLikeTemp: 19.85,
              nightMinFeelsLikeTemp: 12.53,
              dayUpperBoundMaxFeelsLikeTemp: 23.315,
              nightUpperBoundMinFeelsLikeTemp: 15.491,
              dayLowerBoundMaxFeelsLikeTemp: 15.653,
              nightLowerBoundMinFeelsLikeTemp: 5.7654,
              dayProbabilityOfPrecipitation: 2,
              nightProbabilityOfPrecipitation: 5,
              dayProbabilityOfSnow: 0,
              nightProbabilityOfSnow: 3,
              dayProbabilityOfHeavySnow: 0,
              nightProbabilityOfHeavySnow: 0,
              dayProbabilityOfRain: 2,
              nightProbabilityOfRain: 5,
              dayProbabilityOfHeavyRain: 0,
              nightProbabilityOfHeavyRain: 1,
              dayProbabilityOfHail: 0,
              nightProbabilityOfHail: 0,
              dayProbabilityOfSferics: 0,
              nightProbabilityOfSferics: 0,
            },
            {
              time: tomorrow,
              midday10MWindSpeed: 2.73,
              midnight10MWindSpeed: 2.26,
              midday10MWindDirection: 249,
              midnight10MWindDirection: 277,
              midday10MWindGust: 4.12,
              midnight10MWindGust: 4.12,
              middayVisibility: 19704,
              midnightVisibility: 16528,
              middayRelativeHumidity: 44.63,
              midnightRelativeHumidity: 51.29,
              middayMslp: 102280,
              midnightMslp: 102240,
              maxUvIndex: 7,
              daySignificantWeatherCode: 1,
              nightSignificantWeatherCode: 0,
              dayMaxScreenTemperature: 24.512287,
              nightMinScreenTemperature: 16.250788,
              dayUpperBoundMaxTemp: 25.561651,
              nightUpperBoundMinTemp: 18.68265,
              dayLowerBoundMaxTemp: 21.723986,
              nightLowerBoundMinTemp: 11.978246,
              dayMaxFeelsLikeTemp: 20.54,
              nightMinFeelsLikeTemp: 11.68,
              dayUpperBoundMaxFeelsLikeTemp: 23.626,
              nightUpperBoundMinFeelsLikeTemp: 18.15,
              dayLowerBoundMaxFeelsLikeTemp: 13.202,
              nightLowerBoundMinFeelsLikeTemp: 4.721,
              dayProbabilityOfPrecipitation: 2,
              nightProbabilityOfPrecipitation: 0,
              dayProbabilityOfSnow: 0,
              nightProbabilityOfSnow: 0,
              dayProbabilityOfHeavySnow: 0,
              nightProbabilityOfHeavySnow: 0,
              dayProbabilityOfRain: 2,
              nightProbabilityOfRain: 0,
              dayProbabilityOfHeavyRain: 0,
              nightProbabilityOfHeavyRain: 0,
              dayProbabilityOfHail: 0,
              nightProbabilityOfHail: 0,
              dayProbabilityOfSferics: 0,
              nightProbabilityOfSferics: 0,
            },
            {
              time: now.add('2', 'day').toISOString(),
              midday10MWindSpeed: 6.6296477,
              midnight10MWindSpeed: 6.2341933,
              midday10MWindDirection: 188,
              midnight10MWindDirection: 173,
              midday10MWindGust: 13.20337,
              midnight10MWindGust: 12.181207,
              middayVisibility: 15016,
              midnightVisibility: 27250,
              middayRelativeHumidity: 87.32472,
              midnightRelativeHumidity: 83.773705,
              middayMslp: 101285,
              midnightMslp: 100792,
              maxUvIndex: 1,
              daySignificantWeatherCode: 8,
              nightSignificantWeatherCode: 12,
              dayMaxScreenTemperature: 11.606023,
              nightMinScreenTemperature: 9.655949,
              dayUpperBoundMaxTemp: 12.590715,
              nightUpperBoundMinTemp: 11.205988,
              dayLowerBoundMaxTemp: 10.55395,
              nightLowerBoundMinTemp: 8.35298,
              dayMaxFeelsLikeTemp: 9.23,
              nightMinFeelsLikeTemp: 6.7,
              dayUpperBoundMaxFeelsLikeTemp: 10.703,
              nightUpperBoundMinFeelsLikeTemp: 8.834,
              dayLowerBoundMaxFeelsLikeTemp: 5.9036,
              nightLowerBoundMinFeelsLikeTemp: 1.6695,
              dayProbabilityOfPrecipitation: 14,
              nightProbabilityOfPrecipitation: 53,
              dayProbabilityOfSnow: 5,
              nightProbabilityOfSnow: 0,
              dayProbabilityOfHeavySnow: 0,
              nightProbabilityOfHeavySnow: 0,
              dayProbabilityOfRain: 14,
              nightProbabilityOfRain: 53,
              dayProbabilityOfHeavyRain: 3,
              nightProbabilityOfHeavyRain: 30,
              dayProbabilityOfHail: 0,
              nightProbabilityOfHail: 2,
              dayProbabilityOfSferics: 0,
              nightProbabilityOfSferics: 1,
            },
            {
              time: now.add('3', 'day').toISOString(),
              midday10MWindSpeed: 3.8277774,
              midnight10MWindSpeed: 2.9654999,
              midday10MWindDirection: 249,
              midnight10MWindDirection: 155,
              midday10MWindGust: 7.801428,
              midnight10MWindGust: 5.866146,
              middayVisibility: 19730,
              midnightVisibility: 28443,
              middayRelativeHumidity: 59.38092,
              midnightRelativeHumidity: 65.57786,
              middayMslp: 102057,
              midnightMslp: 101758,
              maxUvIndex: 6,
              daySignificantWeatherCode: 12,
              nightSignificantWeatherCode: 7,
              dayMaxScreenTemperature: 23.75605,
              nightMinScreenTemperature: 16.518543,
              dayUpperBoundMaxTemp: 27.718405,
              nightUpperBoundMinTemp: 18.785105,
              dayLowerBoundMaxTemp: 19.695112,
              nightLowerBoundMinTemp: 12.7641,
              dayMaxFeelsLikeTemp: 20.09,
              nightMinFeelsLikeTemp: 10.91,
              dayUpperBoundMaxFeelsLikeTemp: 25.207,
              nightUpperBoundMinFeelsLikeTemp: 17.598,
              dayLowerBoundMaxFeelsLikeTemp: 14.379,
              nightLowerBoundMinFeelsLikeTemp: 4.15,
              dayProbabilityOfPrecipitation: 60,
              nightProbabilityOfPrecipitation: 6,
              dayProbabilityOfSnow: 0,
              nightProbabilityOfSnow: 3,
              dayProbabilityOfHeavySnow: 0,
              nightProbabilityOfHeavySnow: 0,
              dayProbabilityOfRain: 60,
              nightProbabilityOfRain: 6,
              dayProbabilityOfHeavyRain: 42,
              nightProbabilityOfHeavyRain: 2,
              dayProbabilityOfHail: 6,
              nightProbabilityOfHail: 0,
              dayProbabilityOfSferics: 9,
              nightProbabilityOfSferics: 0,
            },
            {
              time: now.add('4', 'day').toISOString(),
              midday10MWindSpeed: 6.3946247,
              midnight10MWindSpeed: 4.949157,
              midday10MWindDirection: 238,
              midnight10MWindDirection: 244,
              midday10MWindGust: 13.155226,
              midnight10MWindGust: 9.90574,
              middayVisibility: 25358,
              midnightVisibility: 28889,
              middayRelativeHumidity: 54.773632,
              midnightRelativeHumidity: 64.01639,
              middayMslp: 101633,
              midnightMslp: 102089,
              maxUvIndex: 5,
              daySignificantWeatherCode: 7,
              nightSignificantWeatherCode: 2,
              dayMaxScreenTemperature: 20.96436,
              nightMinScreenTemperature: 12.049517,
              dayUpperBoundMaxTemp: 22.478014,
              nightUpperBoundMinTemp: 13.481476,
              dayLowerBoundMaxTemp: 18.196564,
              nightLowerBoundMinTemp: 10.507234,
              dayMaxFeelsLikeTemp: 18,
              nightMinFeelsLikeTemp: 11.77,
              dayUpperBoundMaxFeelsLikeTemp: 27.758,
              nightUpperBoundMinFeelsLikeTemp: 19.896,
              dayLowerBoundMaxFeelsLikeTemp: 10.68,
              nightLowerBoundMinFeelsLikeTemp: 5.5939,
              dayProbabilityOfPrecipitation: 30,
              nightProbabilityOfPrecipitation: 4,
              dayProbabilityOfSnow: 3,
              nightProbabilityOfSnow: 0,
              dayProbabilityOfHeavySnow: 0,
              nightProbabilityOfHeavySnow: 0,
              dayProbabilityOfRain: 30,
              nightProbabilityOfRain: 4,
              dayProbabilityOfHeavyRain: 22,
              nightProbabilityOfHeavyRain: 2,
              dayProbabilityOfHail: 4,
              nightProbabilityOfHail: 0,
              dayProbabilityOfSferics: 2,
              nightProbabilityOfSferics: 0,
            },
            {
              time: now.add('5', 'day').toISOString(),
              midday10MWindSpeed: 6.9091043,
              midnight10MWindSpeed: 4.317048,
              midday10MWindDirection: 254,
              midnight10MWindDirection: 258,
              midday10MWindGust: 14.46079,
              midnight10MWindGust: 8.74329,
              middayVisibility: 25711,
              midnightVisibility: 28583,
              middayRelativeHumidity: 41.443695,
              midnightRelativeHumidity: 65.26058,
              middayMslp: 102340,
              midnightMslp: 102757,
              maxUvIndex: 6,
              daySignificantWeatherCode: 7,
              nightSignificantWeatherCode: 0,
              dayMaxScreenTemperature: 18.89863,
              nightMinScreenTemperature: 10.47835,
              dayUpperBoundMaxTemp: 21.741922,
              nightUpperBoundMinTemp: 12.768795,
              dayLowerBoundMaxTemp: 12.879272,
              nightLowerBoundMinTemp: 8.680462,
              dayMaxFeelsLikeTemp: 17.18,
              nightMinFeelsLikeTemp: 9.78,
              dayUpperBoundMaxFeelsLikeTemp: 26.637,
              nightUpperBoundMinFeelsLikeTemp: 14.922,
              dayLowerBoundMaxFeelsLikeTemp: 10.669,
              nightLowerBoundMinFeelsLikeTemp: 7.1215,
              dayProbabilityOfPrecipitation: 15,
              nightProbabilityOfPrecipitation: 2,
              dayProbabilityOfSnow: 3,
              nightProbabilityOfSnow: 0,
              dayProbabilityOfHeavySnow: 0,
              nightProbabilityOfHeavySnow: 0,
              dayProbabilityOfRain: 15,
              nightProbabilityOfRain: 2,
              dayProbabilityOfHeavyRain: 12,
              nightProbabilityOfHeavyRain: 1,
              dayProbabilityOfHail: 2,
              nightProbabilityOfHail: 0,
              dayProbabilityOfSferics: 1,
              nightProbabilityOfSferics: 0,
            },
            {
              time: now.add('6', 'day').toISOString(),
              midday10MWindSpeed: 5.6398087,
              midnight10MWindSpeed: 2.817324,
              midday10MWindDirection: 264,
              midnight10MWindDirection: 267,
              midday10MWindGust: 12.635447,
              midnight10MWindGust: 5.8926086,
              middayVisibility: 29083,
              midnightVisibility: 28735,
              middayRelativeHumidity: 39.231594,
              midnightRelativeHumidity: 60.718906,
              middayMslp: 103048,
              midnightMslp: 103259,
              maxUvIndex: 6,
              daySignificantWeatherCode: 7,
              nightSignificantWeatherCode: 0,
              dayMaxScreenTemperature: 20.930187,
              nightMinScreenTemperature: 11.526558,
              dayUpperBoundMaxTemp: 23.409693,
              nightUpperBoundMinTemp: 14.886416,
              dayLowerBoundMaxTemp: 15.066413,
              nightLowerBoundMinTemp: 8.138015,
              dayMaxFeelsLikeTemp: 17.04,
              nightMinFeelsLikeTemp: 10.53,
              dayUpperBoundMaxFeelsLikeTemp: 22.155,
              nightUpperBoundMinFeelsLikeTemp: 17.268,
              dayLowerBoundMaxFeelsLikeTemp: 12.848,
              nightLowerBoundMinFeelsLikeTemp: 6.415,
              dayProbabilityOfPrecipitation: 4,
              nightProbabilityOfPrecipitation: 1,
              dayProbabilityOfSnow: 3,
              nightProbabilityOfSnow: 0,
              dayProbabilityOfHeavySnow: 0,
              nightProbabilityOfHeavySnow: 0,
              dayProbabilityOfRain: 4,
              nightProbabilityOfRain: 1,
              dayProbabilityOfHeavyRain: 0,
              nightProbabilityOfHeavyRain: 0,
              dayProbabilityOfHail: 0,
              nightProbabilityOfHail: 0,
              dayProbabilityOfSferics: 0,
              nightProbabilityOfSferics: 0,
            },
          ],
        },
      },
    ],
    parameters: [
      {
        daySignificantWeatherCode: {
          type: 'Parameter',
          description: 'Day Significant Weather Code',
          unit: {
            label: 'dimensionless',
            symbol: {
              value:
                'https://metoffice.apiconnect.ibmcloud.com/metoffice/production/',
              type: '1',
            },
          },
        },
        midnightRelativeHumidity: {
          type: 'Parameter',
          description: 'Relative Humidity at Local Midnight',
          unit: {
            label: 'percentage',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: '%',
            },
          },
        },
        nightProbabilityOfHeavyRain: {
          type: 'Parameter',
          description: 'Probability of Heavy Rain During The Night',
          unit: {
            label: 'percentage',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: '%',
            },
          },
        },
        midnight10MWindSpeed: {
          type: 'Parameter',
          description: '10m Wind Speed at Local Midnight',
          unit: {
            label: 'metres per second',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'm/s',
            },
          },
        },
        nightUpperBoundMinFeelsLikeTemp: {
          type: 'Parameter',
          description:
            'Upper Bound on Night Minimum Feels Like Air Temperature',
          unit: {
            label: 'degrees Celsius',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'Cel',
            },
          },
        },
        nightUpperBoundMinTemp: {
          type: 'Parameter',
          description: 'Upper Bound on Night Minimum Screen Air Temperature',
          unit: {
            label: 'degrees Celsius',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'Cel',
            },
          },
        },
        nightProbabilityOfRain: {
          type: 'Parameter',
          description: 'Probability of Rain During The Night',
          unit: {
            label: 'percentage',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: '%',
            },
          },
        },
        dayUpperBoundMaxFeelsLikeTemp: {
          type: 'Parameter',
          description: 'Upper Bound on Day Maximum Feels Like Air Temperature',
          unit: {
            label: 'degrees Celsius',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'Cel',
            },
          },
        },
        midnightVisibility: {
          type: 'Parameter',
          description: 'Visibility at Local Midnight',
          unit: {
            label: 'metres',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'm',
            },
          },
        },
        midday10MWindDirection: {
          type: 'Parameter',
          description: '10m Wind Direction at Local Midday',
          unit: {
            label: 'degrees',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'deg',
            },
          },
        },
        nightLowerBoundMinFeelsLikeTemp: {
          type: 'Parameter',
          description:
            'Lower Bound on Night Minimum Feels Like Air Temperature',
          unit: {
            label: 'degrees Celsius',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'Cel',
            },
          },
        },
        nightProbabilityOfHail: {
          type: 'Parameter',
          description: 'Probability of Hail During The Night',
          unit: {
            label: 'percentage',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: '%',
            },
          },
        },
        middayMslp: {
          type: 'Parameter',
          description: 'Mean Sea Level Pressure at Local Midday',
          unit: {
            label: 'pascals',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'Pa',
            },
          },
        },
        dayProbabilityOfHeavySnow: {
          type: 'Parameter',
          description: 'Probability of Heavy Snow During The Day',
          unit: {
            label: 'percentage',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: '%',
            },
          },
        },
        nightProbabilityOfPrecipitation: {
          type: 'Parameter',
          description: 'Probability of Precipitation During The Night',
          unit: {
            label: 'percentage',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: '%',
            },
          },
        },
        dayProbabilityOfHail: {
          type: 'Parameter',
          description: 'Probability of Hail During The Day',
          unit: {
            label: 'percentage',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: '%',
            },
          },
        },
        dayProbabilityOfRain: {
          type: 'Parameter',
          description: 'Probability of Rain During The Day',
          unit: {
            label: 'percentage',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: '%',
            },
          },
        },
        midday10MWindSpeed: {
          type: 'Parameter',
          description: '10m Wind Speed at Local Midday',
          unit: {
            label: 'metres per second',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'm/s',
            },
          },
        },
        midday10MWindGust: {
          type: 'Parameter',
          description: '10m Wind Gust Speed at Local Midday',
          unit: {
            label: 'metres per second',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'm/s',
            },
          },
        },
        middayVisibility: {
          type: 'Parameter',
          description: 'Visibility at Local Midday',
          unit: {
            label: 'metres',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'm',
            },
          },
        },
        midnight10MWindGust: {
          type: 'Parameter',
          description: '10m Wind Gust Speed at Local Midnight',
          unit: {
            label: 'metres per second',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'm/s',
            },
          },
        },
        dayProbabilityOfSferics: {
          type: 'Parameter',
          description: 'Probability of Sferics During The Day',
          unit: {
            label: 'percentage',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: '%',
            },
          },
        },
        midnightMslp: {
          type: 'Parameter',
          description: 'Mean Sea Level Pressure at Local Midnight',
          unit: {
            label: 'pascals',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'Pa',
            },
          },
        },
        nightSignificantWeatherCode: {
          type: 'Parameter',
          description: 'Night Significant Weather Code',
          unit: {
            label: 'dimensionless',
            symbol: {
              value:
                'https://metoffice.apiconnect.ibmcloud.com/metoffice/production/',
              type: '1',
            },
          },
        },
        dayProbabilityOfPrecipitation: {
          type: 'Parameter',
          description: 'Probability of Precipitation During The Day',
          unit: {
            label: 'percentage',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: '%',
            },
          },
        },
        dayProbabilityOfHeavyRain: {
          type: 'Parameter',
          description: 'Probability of Heavy Rain During The Day',
          unit: {
            label: 'percentage',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: '%',
            },
          },
        },
        dayMaxScreenTemperature: {
          type: 'Parameter',
          description: 'Day Maximum Screen Air Temperature',
          unit: {
            label: 'degrees Celsius',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'Cel',
            },
          },
        },
        nightMinScreenTemperature: {
          type: 'Parameter',
          description: 'Night Minimum Screen Air Temperature',
          unit: {
            label: 'degrees Celsius',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'Cel',
            },
          },
        },
        midnight10MWindDirection: {
          type: 'Parameter',
          description: '10m Wind Direction at Local Midnight',
          unit: {
            label: 'degrees',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'deg',
            },
          },
        },
        maxUvIndex: {
          type: 'Parameter',
          description: 'Day Maximum UV Index',
          unit: {
            label: 'dimensionless',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: '1',
            },
          },
        },
        dayProbabilityOfSnow: {
          type: 'Parameter',
          description: 'Probability of Snow During The Day',
          unit: {
            label: 'percentage',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: '%',
            },
          },
        },
        nightProbabilityOfSnow: {
          type: 'Parameter',
          description: 'Probability of Snow During The Night',
          unit: {
            label: 'percentage',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: '%',
            },
          },
        },
        nightProbabilityOfHeavySnow: {
          type: 'Parameter',
          description: 'Probability of Heavy Snow During The Night',
          unit: {
            label: 'percentage',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: '%',
            },
          },
        },
        dayLowerBoundMaxTemp: {
          type: 'Parameter',
          description: 'Lower Bound on Day Maximum Screen Air Temperature',
          unit: {
            label: 'degrees Celsius',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'Cel',
            },
          },
        },
        dayLowerBoundMaxFeelsLikeTemp: {
          type: 'Parameter',
          description: 'Lower Bound on Day Maximum Feels Like Air Temperature',
          unit: {
            label: 'degrees Celsius',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'Cel',
            },
          },
        },
        dayUpperBoundMaxTemp: {
          type: 'Parameter',
          description: 'Upper Bound on Day Maximum Screen Air Temperature',
          unit: {
            label: 'degrees Celsius',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'Cel',
            },
          },
        },
        dayMaxFeelsLikeTemp: {
          type: 'Parameter',
          description: 'Day Maximum Feels Like Air Temperature',
          unit: {
            label: 'degrees Celsius',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'Cel',
            },
          },
        },
        nightMinFeelsLikeTemp: {
          type: 'Parameter',
          description: 'Night Minimum Feels Like Air Temperature',
          unit: {
            label: 'degrees Celsius',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'Cel',
            },
          },
        },
        nightLowerBoundMinTemp: {
          type: 'Parameter',
          description: 'Lower Bound on Night Minimum Screen Air Temperature',
          unit: {
            label: 'degrees Celsius',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: 'Cel',
            },
          },
        },
        middayRelativeHumidity: {
          type: 'Parameter',
          description: 'Relative Humidity at Local Midday',
          unit: {
            label: 'percentage',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: '%',
            },
          },
        },
        nightProbabilityOfSferics: {
          type: 'Parameter',
          description: 'Probability of Sferics During The Night',
          unit: {
            label: 'percentage',
            symbol: {
              value: 'http://www.opengis.net/def/uom/UCUM/',
              type: '%',
            },
          },
        },
      },
    ],
  };

  return mockMetOfficeJSON;
};

export default generateMockDailyMetOfficeJSON;
