const generateSpecialDatesMetOfficeJSON = (specialDates) => {
  const mockMetOfficeJSON = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-0.050960000000000005, 51.48593, 15],
        },
        properties: {
          requestPointDistance: 1383.1984,
          modelRunDate: '2023-07-10T13:00Z',
        },
      },
    ],
  };

  mockMetOfficeJSON.features[0].properties.timeSeries = [
    ...specialDates.map((specialDate) => {
      const date = specialDate.date;
      if (typeof specialDate.name !== 'string') {
        console.error('special date with no name:');
        console.error(specialDate);
      }
      const isoTime = date.toISOString();

      return {
        time: isoTime,
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
      };
    }),
  ];

  return mockMetOfficeJSON;
};

export default generateSpecialDatesMetOfficeJSON;
